
interface FeedWrapperProps {
    children: React.ReactNode;
}

const FeedWrapper = (props:FeedWrapperProps) => {
    const {children} = props;


  return (
    <div className="flex-1 relative top-0 pb-10">
        {children}
    </div>
  )
}

export default FeedWrapper