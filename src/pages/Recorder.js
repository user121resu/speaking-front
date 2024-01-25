import React, {useState, useRef} from 'react';
import {API, token} from "../components/api";
import axios from "axios";
import Timer from "./Timer";
import {toast, ToastContainer} from "react-toastify";
import Loading from "../components/Loading";
const VoiceRecorder = () => {
    const [isGetRandomQuiz, setGetRandomQuiz] = useState(false);
    const [loading, setLoading] = useState(false);
    const [question, setTopic] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const mediaRecorderRef = useRef(null);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                let chunks = [];

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(chunks, {type: 'audio/wav'});
                    setRecordedAudio(URL.createObjectURL(audioBlob));
                };

                mediaRecorder.start();
                setIsRecording(true);
                setTimeout(() => {
                    stopRecording();
                }, 10000);
            })
            .catch(error => console.error('Error accessing microphone:', error));
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const sendAudioToServer = () => {
        if (recordedAudio) {
            const formData = new FormData();
            const blob = new Blob([recordedAudio], {type: 'audio/wav'});
            formData.append('file', blob, 'audio.wav');
            uploadAudioToServer(formData);
        } else {
            console.error('No audio to send.');
        }
    };

    function notify(status, message) {
        if (status === 200) {
            toast.success(message);
        } else if (status === 404) {
            toast.warn(message);
        } else if (status === 403) {
            toast.error(message);
        }
    }

    function uploadAudioToServer(formData) {
        axios.post(API + '/speaking/save/'+question.id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                console.log('Audio successfully sent to server:', response.data);
            })
            .catch(error => {
                console.error('Error sending audio to server:', error);
            });
    }

    function getRandomQuestion() {
        setGetRandomQuiz(true);
        setLoading(true);
        // axios.get(API + "/topic/random", {
        //     headers: token
        // }).then((response) => {
        //     setTopic(response.data);
        //     setLoading(false);
        // }).catch((error) => {
        //     notify(404, error.response.data.message);
        // })
        setTopic({id:1,topic:"Tell me about your hometown"});
    }


    return (
        <>
            <div className="container" style={{textAlign: "center"}}>
                <br></br>
                <div className="panel-content">
                    <button type="button"
                            className="btn btn-success"
                            onClick={getRandomQuestion}>
                        Tasodifiy savolni olish
                    </button>
                </div>
                <div className="panel-content">
                    <p>
                        {question !== null ? question.topic : <></>}
                    </p>
                </div>
                {
                    isGetRandomQuiz ?
                    <>
                        <div className="panel-content">
                            <button type="button"
                                    className="btn btn-outline-primary"
                                    onClick={startRecording}
                                    disabled={isRecording}>
                                Ovoz yozish
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={sendAudioToServer}
                                disabled={isRecording}>
                                Saqlash
                            </button>
                            {isRecording ? <div className='sound-icon disabled'>
                                <div className='sound-wave'>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                    <i className='bar'></i>
                                </div>
                            </div> : <></>}
                        </div>
                        <br></br>
                        <div className="panel-content">
                            {
                                isRecording ? <Timer deadline={10}/> : <></>
                            }
                        </div>
                        {recordedAudio && <audio controls src={recordedAudio}/>}
                        <ToastContainer/>
                    </> : <></>
                }
            </div>
            {loading ? <Loading/> : <></>}
        </>
    );
};

export default VoiceRecorder;
