import React, {useEffect, useState} from 'react';
import './App.css';
import {PickerOverlay} from 'filestack-react';


const App = () => {

    const [isShowed, setIsShowed] = useState(false)

    const [uploadedFiles, setUploadedFiles] = useState<any[]>([])


    const handleUpload = (res: any) => {
        console.log(res)
        const updLoadedFiles = [...uploadedFiles]
        res.filesUploaded.map(({handle, filename}: any) => {
            const newFile = {
                handle,
                filename,
                timeStamp: new Date().toLocaleString()
            }
            updLoadedFiles.push(newFile)

        })
        localStorage.setItem('updStorage', JSON.stringify(updLoadedFiles))
        setUploadedFiles(updLoadedFiles)
        setIsShowed(false)
    }

    const deleteFile = (fileId: string) => {
        const updLoadedFiles = uploadedFiles.filter((file) => file.handle !== fileId)
        localStorage.setItem('updStorage', JSON.stringify(updLoadedFiles))
        setUploadedFiles(updLoadedFiles)
    }

    useEffect(() => {

        const filesLocalStorage = JSON.parse(localStorage.getItem('updStorage') || '') || []
        setUploadedFiles(filesLocalStorage)


    }, [])

    return (
        <div className='main'>
            <h1 className={`title`}>F - Loader</h1>
            <p>Upload your files</p>
            <button className={`btn`} onClick={() => setIsShowed(!isShowed)}>Upload</button>
            <div className={`uploaded-files`}>
                <h3>Uploaded files:</h3>
                {
                    uploadedFiles.length === 0 ?
                        <p>No files have been uploaded</p>
                        :
                        <ul>
                            {uploadedFiles.map(({handle, filename, timeStamp}) => (
                                <li key={handle}>
                                    <span>{filename}</span>
                                    <span>{timeStamp}</span>
                                    <button className={`redirect-button`} onClick={() => window.open(`https://cdn.filestackcontent.com/${handle}`)}>Open</button>
                                    <button className={`delete-button`} onClick={() => deleteFile(handle)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                }
            </div>
            {
                isShowed ?
                    <div>


                        <PickerOverlay
                            apikey={'AYmFAc2thRwqTF7AK7xe4z'}

                            onUploadDone={(res) => handleUpload(res)}
                        />
                    </div>
                    :
                    null
            }
        </div>
    )

};

export default App;
