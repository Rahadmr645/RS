import React, { useContext } from 'react';
import styles from './PostForm.module.css';
import { Context } from '../context/StoreContext';

const PostForm = () => {
    const { postForm, setPostForm, setShowPostForm, PostSubmit } = useContext(Context);

    // Correct input change handler
    const onPostChangeHandler = (e) => {
        const { name, type } = e.target;
        if (type === 'file') {
            setPostForm((prev) => ({ ...prev, [name]: e.target.files[0] }));  // Store file properly
        } else {
            setPostForm((prev) => ({ ...prev, [name]: e.target.value }));
        }
    };

    return (
        <div className={styles.postFormContainer}>
            <form onSubmit={PostSubmit} className={styles.formPostContainer}>  {/* ✅ Corrected */}
                <div>
                    <h2> Make a post</h2>
                    <button type="button" onClick={() => setShowPostForm(false)}>x</button>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.caption}>
                        <label htmlFor="captions">Captions</label>
                        <input 
                            type="text"
                            onChange={onPostChangeHandler}
                            id='Captions' 
                            name='text' 
                            value={postForm.text} 
                        />
                    </div>
                    <div className={styles.caption}>
                        <label htmlFor="image">Picture</label>
                        <input 
                            type="file"
                            accept="image/*"  // ✅ Only accept images
                            onChange={onPostChangeHandler} 
                            id='image' 
                            name='image' 
                        />
                    </div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
