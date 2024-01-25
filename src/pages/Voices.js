import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {API, token} from "../components/api";

const Voices = () => {
    const [speakings, setSpeakings] = useState([]);

    useEffect(() => {
        axios.get(API + "/speaking/get-popular", {
            headers: token
        }).then((response) => {
            setSpeakings(response.data);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }, []);
    return (
        <div>
            {
                speakings.map((speaking) => {
                    return (
                        <div>
                            <p>{speaking.speaker.fullName}</p>
                            <audio controls>
                                <source
                                    src={speaking.audioPath}
                                    type="audio/wav"/>
                            </audio>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Voices;