const Button = ({
    title,
    id,
    rightIcon,
    leftIcon,
    containerClass,
    onClick,
    type = 'button',
    disabled = false
}) => {
    return (
        <button
            id={id}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`group relative z-20 w-fit cursor-pointer rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
        >
            {leftIcon}
            {title}
            {rightIcon}
        </button>
    )
}

export default Button