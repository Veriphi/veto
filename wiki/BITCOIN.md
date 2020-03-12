# Bitcoin Knowledge Base

## [why Bitcoin?](https://medium.com/@wiz/why-bitcoin-359ada12629e)

### Money
* Bitcoin is a form of Money. The US & Canadian Dollar & Gold are other forms of Money.
* Money is any object that serves the following three objectives :
  * Store of Value. (When you produce value, how do you keep it?)
  * Medium of Exchange. (How do you exchange value in situations other than troc?)*
  * Unit of account (How do you compare the value between different goods?)
  
### Fiat Money
* Our current monetary system, either the US Dollar, or Canadian Dollar or Chinese Yuan, have no intrinsic value and are simply numbers on a screen or paper. They all share a government seal and that’s the reason why the market values them.
* They aren’t credit that the government guarantees at all, the government simply promises that they will handle it responsibly and people either trust it or not.
* Governments don’t decide on money’s value, the whole market does. Government is an actor of the market that tries to influence money’s value and can succeed effectively but can also fail dramatically. 
* Many cases have shown, such as Venezuela recently, that markets can lose confidence in the government and its ability to safely manage the monetary policy. 
* When countries are presented to a bad economic situation, a common Keynesian reaction is to lower interest rates. This basically means they’re inviting anyone to take loans to repump the economy by business investing or consuming, and they’re giving out these loans with money printed.
* When governments print money, they reduce the value of the unit because a unit doesn’t represent any particular value, the sum of all money represents a particular value. If more money comes in through supply emission, dilution happens.
Governments always end up printing too much money and devalue their currency. The US government is doing it right now to battle Coronavirus ([1.5 TRILLION DOLLARS in short term loans to Banks on March 12th 2020](https://www.bloomberg.com/news/articles/2020-03-12/n-y-fed-to-conduct-purchases-across-range-of-maturities-k7ozy3u5?srnd=premium-canada))

### Gold
* There’s also gold, people have used gold for thousands of years and still do, but mostly for the store of value use case. Why? * Because no one can manipulate gold’s supply, nature creates it and it’s extremely rare. Also, gold is always at maximum extraction, compared to other commodities like Diamonds or Silver, that if demand arises, supply can arise as well. If gold demands arise, supply doesn’t change at all, supply is already at maximum.
* Gold is unpractical for the medium of exchange thus for the unit of account use case :
  * Heavy to transport and physically limited. 
  * Hard to divide. 
* Also limited on store of value : Hard to hide so easy to seize by gov/thieves.

### Bitcoin
* Bitcoin has existed since 2009. There can only be 21 million units and there’s a predictable supply schedule, there’s around 18 million currently on the market, 3 million still left to ‘’extract’’. 
* Bitcoin is rarer than Gold. 
* Bitcoin doesn’t have limits of gold because it’s digital :
  * It consumes no physical space, so easy to hide and transport.
  * You can send it from one side of the planet to the other.
  * It’s extremely easy to divide.
* Bitcoin is the superior form of money, it fixes the problems with the current monetary system but keeps the values that made the world switch from Gold to Fiat.
* Bitcoin achieves this in a decentralized form, through cryptography and game theory mostly, described in a protocol of rules.
* Since Bitcoin is decentralized, no one can stop me from making a transaction, unlike a bank. Like when I have physical cash or gold, I'm fully in control of my property, but in a digital world. There's no other asset that works like this. I have censorship-resitance when using Bitcoin (if used correctly).

![Bitcoin's Supply Schedule](/wiki/images/supply.png)

## How does Bitcoin work?

### Overview
* Bitcoin is a protocol of rules.
* Bitcoin Core, the main software implementation of the protocol, is an open-source software that anyone can install on their computer.
* Bitcoin is a Peer to Peer Network where those that run the software implementation can communicate and are compatible.
* Anyone can create their own software implementation of the Bitcoin protocol and be fully compatible with the network if they respect the rules.

### How to receive or send Bitcoin?
* Once you're running the software and you want to receive Bitcoin, you generate a private key by selecting a 256 bit random number that's included in the Secp256k1 elliptic curve. There are basically no number that falls outside that range. Once you have that private key, you want to keep it private and safe. 
* How can I receive Bitcoins, that can only be spent by the owner of my key, without transmitting my key? [Asymetric cryptography  or public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) allows me to generate a public key to my private key, but if someone gets access to the public key, they can't generate the private key. It's a one-way function.
* In Bitcoin's case, [Elliptic Curve Cryptography](https://gitpitch.com/tari-labs/tari-university/master?p=/src/cryptography/crypto-1#/) is the function used to generate a public key. This isn't what I'll send my counterparty thought, I'll hash it with SHA256 + RIPEM160 functions to key the public key hash. Finally, to get the final format, the Bitcoin Address, I'll encode it with base58.
* I now have the Bitcoin address, I'll send to my counterparty. How can he prove to the whole network that's the owner of the Bitcoin he wishes to send, without revealing his private key? He has to produce a digital signature that only the owner of the private key could be cryptographically able to produce. In Bitcoin, we use ECDSA ([Elliptic Curve Digital Signature Algorithm](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)). This proof confirms that he's able to spend the Bitcoins in question and execute the transaction. 

### If anyone can make a transaction, what prevents cheating?
* The objective of the P2P Network is to establish consensus on the history of transactions and the account states. In other words, how can we achieve what a Bank does through a centralized database? How can we make sure that everyone is running the same database, thus the same history of transactions and that nobody is cheating / double spending (sending the same amount to two people at the same time).
* A blockchain is the selected database for Bitcoin, but it doesn’t ensure consensus. A Blockchain is simply a chain of blocks, where each block contains the cryptographic hash of the previous block, to create a clear sequence.

![Blockchain Illustration](/wiki/images/blockchain.png)

* Each block, is an updated state of the accounts of the network (who has how much Bitcoin), it contains a set of transactions where folks have sent or received Bitcoins between themselves.
* Let's say Bob has 2 Bitcoins and he sent to Alice 1 Bitcoin in block 100,000. It's now block 105,000, and he wishes to send Carol 1.5 Bitcoin. The network knows Bob is trying to cheat because he's trying to spend more Bitcoin that he has so his transaction is refused. 
* This assumes that the network is following the same chain of blocks, the question comes back. How can we ensure everyone is running the same sequence of the database?

## Mining and Proof of Work
* Since Bitcoin is a decentralized and open network, anyone can propagate messages, either transactions or blocks. Transactions on their own don't affect the state of the network, it's the blocks that regroup them that affect the continued history of the network.
* Individually, folks running the software, Nodes, agree on the validaty of the blocks they receive depending on what their local rules are. It means that Nodes are analyzing all the received information, what prevents someone from Sybil Attacking the network and spinning thousands of Nodes and dumping GBs of data a second onto other nodes to make a DDOS attack?
* Proof of Work, or the mining algorithm, is the answer. Nodes say : "I will only read the content of your block, if your header contains the required proof-of-work?" The required proof of work is a hard to create, but easy to validate, mathematical question. 
* Briefly, the mining algorithm, is a protocol rule of the network, that says : "To create the proof of work required for block 100 001, you need to find a random number, that multiplied with all the basic block information (the previous block hash, the current time, and a hash of the combination of all transactions included in this block), and hashed through SHA256 twice, emits a block hash that begins with this "00000000000".
* Folks wanting to achieve this proof of work, have to hash the function, through trial and error, and at each trial they adapt the random number, until they fall on an answer that corresponds to the desired threshold. We call them Miners.
* Hashing that function consumes lots of electricity and requires specialized hardware that go through 10 of TRILLIONS of hashes per second, per machine. Some miners have 10 000s of machines. 
* Once a miner has reached the proof of work, he submits his block to the each network participant he's connected to, and since others can easily validate that it does contain the valid proof of work, they start analyzing the content, the individual transactions. If they're also valid and no cheating has occured, individually, they accept the block as valid on their local machine. They then propagate to their own peers, who follow through the same process and very rapidly, the whole Bitcoin network adapts a new block, machine by machine. 
* What if a miner submits valid proof of work but includes a cheating transaction? Individually, Nodes refuse his block for trying to cheat and don't propagate his block, his block is quickly orphaned and becomes useless. He just wasted huge amounts of money and no one wants to be in situation, so miners aren't incentivized to cheating. 
* To increase incentives, a miner that proposes a block, is allowed by the protocol rules and if he follows the emission schedule, to create Bitcoins and assign them to himself. Currently, on each block, a miner can create 12.5 Bitcoin, but that changes every few blocks, in May, it reduces in half. That process of reducing the reward happens around every 4 years. A 
* A block has limited size, it can only be up to 2.4 MB. It means that the Bitcoin network has very limited throughput (around 7 transactions per second). Only a handful of transactions get included in a block, and if many people want to transact at the same time, they each offer a fee to the miner, to incentivize him to select their transaction instead of other's transactions. A miner also gets all the transaction fees included in his block, as a reward.
* Blocks happen every 10 minutes on average and that is possible because of the difficulty adjustement. Basically, the difficulty to reach proof of work, depends on the miners activity. If there are 10 miners with each a power of 10 hashes/second, the whole network has a hashrate of 100h/s. If 20 extra miners add themselves with the same power, it goes up to 300h/s. This means that, on average, the network should take a third of the time to find a block. It would, but the proof of work of difficutly adjusts, it simply becomes 3 times harder to find the proof of work on average, so block time goes back to 10 minutes.

# The Project : Cyphernode

Back to reality, even that Nodes are the ultimate force behind the network, they remain complicated to deploy in all many types of situations. Developers have built their applications and entreprise systems using external public APIs like Bitpay and Blockchain.com for the past years, who provide a reliable service and allow for easy onboarding by abstracting some concepts. 

In 2015, these companies realized their strength over the network, given that they powered basically all entreprise services and applications. They wanted to make their businesses more profitable and one of their costs by processing transactions on the accounts of their users, was the Bitcoin mining fees they were paying. Also, they wanted to process more transactions. 

Thus, started the Block Size wars, where these companies pushed for protocol level changes to increase the Block Size. Obviously, they failed in November 2017 and have ever since abandonned plans to take over the network. Why is this so bad? If companies can change a protocol rule through a business agreement, Bitcoin isn't working. If block size increases, regular folks can't run nodes on raspberry pis or home laptops, they need more bandwidth, RAM, CPU Power and the network would slowly centralize around a couple servers only, and guess who would own them? Miners and the API companies. At that point, nothing would stop them to change any rule.

Cyphernode aims to replace Bitpay / Blockchain.com as an open-source and self-hosted API Server that facilites developer onboarding in the development of Bitcoin applications or services. 

On top of that, Cyphernode integrates complementary software, such as external libraries, Tor, Wasabi, C-lightning, and a few other components and make them all accessible through a single REST API Gateway. The purpose is to simplify the deployment, dockerization, configuration and communication with the Bitcoin Node Software and some related software, in a secure way.

Communicating directly to Bitcoin Core for an application is extremely discouraged, since the only read/write interface is a JSON-RPC, which allows authentification but provides no encryption. No application should be communicating directly to it for security reasons. More here : https://github.com/bitcoin/bitcoin/blob/master/doc/JSON-RPC-interface.md

Cyphernode will become more and more useful as we explore the additional components and make operations between the components, but that's a topic for another time. For now, we're focused on Bitcoin Core only. 

## Veto in all this.
### The Problem.
Now that you understand the value proposition of Nodes, the collective power they have over the network, it's time to understand the individual power. 

* If I'm using Bitcoin, there's always a Node that connects to me to the network. Usually, if I don't have one, I'm using a third party one, and I'm connecting to it through an API. This is the case for basically all mobile, desktop or web applications. This means that a third-party is analyzing all my transaction information, linking my addresses between themselves, linking them to my IP address, maybe even my email. Huge Privacy Risk. Company can get hacked, can sell data, and I can get targeted for having money. 
* A third-party API can also decide to shut down my service if they don't like my activity. I will still own my keys, thus my Bitcoin, but I won't be able to verify incoming transactions or propagate outgoing ones. I won't have censorship-resistance, so why am I using Bitcoin? Sure, I could switch API Provider, but they're basically all regulated American or Chinese companies that can block all transactions that the respective governments enforce censorship on.
* The biggest value out of using your own Node instead of a third-party API is that you verify all the blocks and all the transactions with your own local rules. When you receive a transaction, you know you've very well received it, since all cryptographic proofs of the whole Bitcoin history have been verified by your local rules, on your local machine. You can't get frauded. The third-party API could blatantly lie to you, since it's just a REST API, no cryptographic proofs involved. 

Running a Node is the only way to use Bitcoin and get its full value proposition. 

### Looking for the solution
* Many realize the problems with third-party APIs and want to run a personal Node. They download Bitcoin Core but it consumes all ressources on their laptop. Then, they get a Raspberry Pi and install Bitcoin Core on it, but how to put in effective use now? 
* Folks have hardware wallets to hold their keys, since an internet connected retail computer can't be trusted to hold confidential and valuable information, how to link the hardware wallet to the node?
* How to run the Node through Tor?

There are many efforts to do that can be automated, abstracted and a product can be offered to make life easier. Nodl have tried doing so and they haven't reach a good user experience. 

Veto can be just what the market needs.

## Ressources
### Curriculums
* https://github.com/chaincodelabs/bitcoin-curriculum 
* https://github.com/chaincodelabs/lightning-curriculum  
### Complete Intro
* https://www.youtube.com/watch?v=IAFKJVLNVQA&feature=youtu.be 
* https://bitcoin.org 
* https://bitcoin.org/bitcoin.pdf 
### alue Proposition
* https://medium.com/@vijayboyapati/the-bullish-case-for-bitcoin-6ecc8bdecc1 
### Understanding the Protocol / Concepts
* http://learnmeabitcoin.com/ 
* https://teachbitcoin.io/curriculum/ 
* https://github.com/minium/Bitcoin-Spec/blob/master/Bitcoin.pdf
### Advanced thoughts
* https://www.gwern.net/Bitcoin-is-Worse-is-Better 
### The Code
* https://bitcoincore.org
* https://github.com/SatoshiPortal/cyphernode 
* https://github.com/bitcoin-studio/Bitcoin-Programming-with-BitcoinJS 
* https://github.com/ChristopherA/Learning-Bitcoin-from-the-Command-Line 
### Extra ressource pages
* https://en.bitcoin.it/wiki/Main_Page 
* https://www.lopp.net/bitcoin-information.html 
* https://bitcoinrabbithole.org/ 
* https://bitcointechweekly.com/ 
