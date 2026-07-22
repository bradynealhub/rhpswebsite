import { addCommentAction } from "@/app/portal/(app)/documents/actions";
import type { DocumentCommentWithAuthor } from "@/lib/portalTypes";

export function CommentThread({ documentId, comments }: { documentId: string; comments: DocumentCommentWithAuthor[] }) {
  return (
    <div>
      <h2 style={{ fontSize: "17px" }}>Comments</h2>
      {comments.length === 0 ? (
        <p className="text-muted" style={{ fontSize: "13px" }}>No comments yet.</p>
      ) : (
        <ul className="mt-3 space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="card blueprint">
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <p style={{ fontSize: "13px", fontWeight: 500 }}>{comment.author_name}</p>
              <p style={{ fontSize: "13px", margin: 0 }}>{comment.body}</p>
              <p className="text-muted" style={{ fontSize: "11px", margin: 0 }}>{comment.created_at}</p>
            </li>
          ))}
        </ul>
      )}

      <form action={addCommentAction} className="mt-4 space-y-2">
        <input type="hidden" name="documentId" value={documentId} />
        <textarea name="body" required rows={3} placeholder="Add a comment..." className="input" />
        <button type="submit" className="btn btn-secondary">
          Comment
        </button>
      </form>
    </div>
  );
}
