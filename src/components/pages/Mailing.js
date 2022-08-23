import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import PlayersTable from "../elements/PlayersTable";

function Mailing({ data, loading }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    setMessage("");
    setSelectedPlayers([]);
  };
  return (
    <>
      <PlayersTable
        type="mailing"
        selectedPlayers={selectedPlayers}
        setSelectedPlayers={setSelectedPlayers}
        data={data}
        loading={loading}
      />
      <h5 className="mb-5">Сообщение:</h5>
      <InputTextarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        cols={150}
        autoResize
      />
      <Button
        label="Отправить"
        aria-label="Submit"
        onClick={sendMessage}
        disabled={selectedPlayers.length === 0 || message === ""}
        className="mb-1 ml-4"
      />
    </>
  );
}

export default Mailing;
