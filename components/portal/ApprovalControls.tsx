import { decideApprovalAction, reopenForEditingAction, submitForReviewAction } from "@/app/portal/(app)/documents/actions";
import type { DocumentApprovalWithApprover, DocumentWithUploader, PortalUser } from "@/lib/portalTypes";

export function ApprovalControls({
  document,
  approvals,
  currentUser,
  canApprove,
}: {
  document: DocumentWithUploader;
  approvals: DocumentApprovalWithApprover[];
  currentUser: PortalUser;
  canApprove: boolean;
}) {
  const isUploaderOrFoundingOperator = document.uploader_user_id === currentUser.id || currentUser.tier === "Founding Operator";

  return (
    <div className="rounded-md border border-charcoal/10 p-4">
      <h2 className="font-headline text-lg font-bold text-charcoal">Review status: {document.status}</h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {/* Richtext documents submit from inside CollaborativeEditor
            (SubmitForReviewButton) -- it needs the live editor's content,
            which this server component doesn't have access to. */}
        {document.doc_type === "file" && document.status === "Draft" && isUploaderOrFoundingOperator ? (
          <form action={submitForReviewAction}>
            <input type="hidden" name="documentId" value={document.id} />
            <button
              type="submit"
              className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90"
            >
              Submit for review
            </button>
          </form>
        ) : null}

        {document.status === "In Review" && canApprove ? (
          <>
            <form action={decideApprovalAction}>
              <input type="hidden" name="documentId" value={document.id} />
              <input type="hidden" name="decision" value="Approved" />
              <button
                type="submit"
                className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90"
              >
                Approve
              </button>
            </form>
            <form action={decideApprovalAction}>
              <input type="hidden" name="documentId" value={document.id} />
              <input type="hidden" name="decision" value="Rejected" />
              <button
                type="submit"
                className="rounded-md border border-red-700 px-4 py-2 font-body text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white"
              >
                Reject
              </button>
            </form>
          </>
        ) : null}

        {document.status === "Rejected" && isUploaderOrFoundingOperator ? (
          <form action={reopenForEditingAction}>
            <input type="hidden" name="documentId" value={document.id} />
            <button
              type="submit"
              className="rounded-md border border-charcoal/20 px-4 py-2 font-body text-sm text-charcoal hover:border-evergreen"
            >
              Reopen for editing
            </button>
          </form>
        ) : null}
      </div>

      {approvals.length > 0 ? (
        <div className="mt-4">
          <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/50">
            Approval history
          </h3>
          <ul className="mt-2 space-y-2">
            {approvals.map((approval) => (
              <li key={approval.id} className="font-body text-sm text-charcoal/80">
                <span className={approval.decision === "Approved" ? "text-evergreen" : "text-red-700"}>
                  {approval.decision}
                </span>{" "}
                by {approval.approver_name} (v{approval.document_version}) &middot; {approval.created_at}
                {approval.note ? ` — "${approval.note}"` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
