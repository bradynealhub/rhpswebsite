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
    <div className="card blueprint">
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <h2 style={{ fontSize: "17px", margin: 0 }}>Review status: {document.status}</h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {/* Richtext documents submit from inside CollaborativeEditor
            (SubmitForReviewButton) -- it needs the live editor's content,
            which this server component doesn't have access to. */}
        {document.doc_type === "file" && document.status === "Draft" && isUploaderOrFoundingOperator ? (
          <form action={submitForReviewAction}>
            <input type="hidden" name="documentId" value={document.id} />
            <button type="submit" className="btn btn-primary">
              Submit for review
            </button>
          </form>
        ) : null}

        {document.status === "In Review" && canApprove ? (
          <>
            <form action={decideApprovalAction}>
              <input type="hidden" name="documentId" value={document.id} />
              <input type="hidden" name="decision" value="Approved" />
              <button type="submit" className="btn btn-primary">
                Approve
              </button>
            </form>
            <form action={decideApprovalAction}>
              <input type="hidden" name="documentId" value={document.id} />
              <input type="hidden" name="decision" value="Rejected" />
              <button type="submit" className="btn btn-secondary" style={{ color: "#a13328", borderColor: "#a13328" }}>
                Reject
              </button>
            </form>
          </>
        ) : null}

        {document.status === "Rejected" && isUploaderOrFoundingOperator ? (
          <form action={reopenForEditingAction}>
            <input type="hidden" name="documentId" value={document.id} />
            <button type="submit" className="btn btn-secondary">
              Reopen for editing
            </button>
          </form>
        ) : null}
      </div>

      {approvals.length > 0 ? (
        <div className="mt-4">
          <h6>Approval history</h6>
          <ul className="mt-2 space-y-2">
            {approvals.map((approval) => (
              <li key={approval.id} style={{ fontSize: "13px" }}>
                <span className={approval.decision === "Approved" ? "tag tag-accent" : "tag tag-danger"}>
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
