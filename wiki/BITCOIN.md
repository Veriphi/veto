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

## What about Bitcoin Wallets / Apps?


