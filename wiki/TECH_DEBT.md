# Tech Debt

Things we will have to address in the future

- [ ] Remove 7z files out of the repo because git can't parse them and does a full copy on each change.
  - Do not wait too long as each change to client.7z and config.7z has to be taken out of git's history by hand.
- [ ] Create a layer of indirection between routes & express - Doing so will make routes easy to tests and change to another web server library if needed.
      [ ] Clean without root access - Currently cyphernode cleanup can only be done with root since the folders are created with this user - Check if the user parameter in cyphernode setup can be used to change the user/group of
