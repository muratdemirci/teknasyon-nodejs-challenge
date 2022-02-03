const PlayerModel = require("../../models/player");

module.exports = {
  getPlayers: function (req, res) {
    // get top players
    // http://localhost:5000/api/v1/players?top=100&sort=asc
    const topPlayers = async () => {
      const limit = req.query.top;
      const sort = req.query.sort;

      try {
        const players = await PlayerModel.find()
          .sort({ score: sort })
          .limit(limit);

        res.send(players);
      } catch (error) {
        res.send(error);
      }
    };

    // find current player by playerId
    // http://localhost:5000/api/v1/players?id=124-944-515
    const currentPlayer = async () => {
      const playerId = req.query.id;
      try {
        const player = await PlayerModel.findOne({
          userId: playerId,
        });

        res.send(player);
      } catch (error) {
        res.send(error);
      }
    };

    // well, sh*t
    const betweenTwoPlayers = async () => {
      res.send("betweenTwoPlayers");
    };

    const queryType = Object.keys(req.query);

    const handlePlayerRequest = {
      top: topPlayers,
      id: currentPlayer,
      between: betweenTwoPlayers,
    };

    handlePlayerRequest[queryType[0]]();
  },
};
