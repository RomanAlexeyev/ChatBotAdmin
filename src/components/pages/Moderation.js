import React from "react";
import PlayersTable from "../elements/PlayersTable";

function Moderation ({data, loading}) {
    return (
        <PlayersTable type="moderation" data={data} loading={loading}/>
    )
}

export default Moderation;