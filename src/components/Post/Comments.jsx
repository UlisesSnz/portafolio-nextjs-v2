import AddComment from "./AddComment";
import ShowComments from "./ShowComments";

const Comments = ({ postId, title, slug, commentsOrder }) => {
    return (
        <div className="my-64 md:my-32">
            <h2 className="font-bold text-8xl mb-16 w-full text-center md:text-6xl xs:text-4xl">
                Comentarios
            </h2>
            <AddComment postId={postId} postTitle={title} />
            <ShowComments postId={postId} slug={slug} commentsOrder={commentsOrder} />
        </div>
    )
}

export default Comments;
