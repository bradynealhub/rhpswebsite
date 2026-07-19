import { addCommentAction } from "@/app/portal/(app)/documents/actions";
import type { DocumentCommentWithAuthor } from "@/lib/portalTypes";

export function CommentThread({ documentId, comments }: { documentId: string; comments: DocumentCommentWithAuthor[] }) {
  return (
    <div>
      <h2 className="font-headline text-lg font-bold text-charcoal">Comments</h2>
      {comments.length === 0 ? (
        <p className="mt-2 font-body text-sm text-charcoal/50">No comments yet.</p>
      ) : (
        <ul className="mt-3 space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-md border border-charcoal/10 p-3">
              <p className="font-body text-sm font-semibold text-charcoal">{comment.author_name}</p>
              <p className="mt-1 font-body text-sm text-charcoal/80">{comment.body}</p>
              <p className="mt-1 font-body text-xs text-charcoal/40">{comment.created_at}</p>
            </li>
          ))}
        </ul>
      )}

      <form action={addCommentAction} className="mt-4 space-y-2">
        <input type="hidden" name="documentId" value={documentId} />
        <textarea
          name="body"
          required
          rows={3}
          placeholder="Add a comment..."
          className="w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
        />
        <button
          type="submit"
          className="rounded-md border border-charcoal/20 px-4 py-2 font-body text-sm text-charcoal hover:border-evergreen"
        >
          Comment
        </button>
      </form>
    </div>
  );
}
