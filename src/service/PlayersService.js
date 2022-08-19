import axios from "axios";

export class PlayersService {
  getPlayers() {
    return axios
      .get("assets/demo/data/players.json")
      .then((res) => res.data.data);
  }

  getPlayersForModeration() {
    return axios
    .get("assets/demo/data/players.json")
    .then((res) => {
        const data = res.data.data;
        const filtered = data.filter(player => !!player.for_moderation);
        return filtered;
    });
  }
}
