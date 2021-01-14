# The Ledger

A Discord Bot that allows users to keep track (maintain a ledger, including ladderboard and score persistence) of users that win or lose the group ranking points (MMR) in DoTA2.  

It tracks a total +/- over time, including the number of games, for a particular user. Users can tag others as MVP (adding ranking points) or blame thme (removing points) by tagging them in the Discord chat. 

Deployed to an AWS EC2 and leveraging MongoDB (hosted via MongoDB Atlas) for persistence. Leverages the Discord APIs for interacting with Discord communities. 
