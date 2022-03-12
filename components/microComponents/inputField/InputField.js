import styles from './InputField.module.scss';

export default function InputField(props) {
    const label = props.label;
    const value = props.value;
    const onChange = props.onChange;
    const textarea = props.textarea;

    const changeHandler = e => {
        e.preventDefault();
        const value = e.target.value;
        onChange(value);
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <span className={styles.labelTxt}>{label}</span>
                <div className={styles.inputContainer}>
                    {textarea ? (
                        <textarea
                            type='text'
                            className={styles.input}
                            value={value}
                            onChange={changeHandler}
                            rows={3}
                        />
                    ) :
                        <input
                            type='text'
                            className={styles.input}
                            value={value}
                            onChange={changeHandler}
                        />
                    }
                </div>
            </label>
        </div>
    )
}