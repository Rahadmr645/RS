import React, { useContext } from 'react'


import styles from './PostForm.module.css'
import { Context } from '../context/StoreContext'


const PostForm = () => {
    const { postForm, onPostChangeHandler, setShowPostForm,PostSubmit } = useContext(Context);
    return (
        <div className={styles.postFormContainer}>
            <form action={PostSubmit()} className={styles.formPostContainer}>
                <div>
                    <h2> Make a post</h2>
                    <button onClick={() => setShowPostForm(false)}>x</button>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.caption}>
                        <label htmlFor="captions">Captions</label>
                        <input type="text"
                            onChange={onPostChangeHandler} id='Captions' name='text' value={postForm.text} />
                    </div>
                    <div className={styles.caption}>
                        <label htmlFor="image">Picture</label>
                        <input type="file"
                            onChange={onPostChangeHandler} id='image' name='image' />
                    </div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default PostForm;