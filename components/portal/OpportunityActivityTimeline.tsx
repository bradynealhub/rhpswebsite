import { addOpportunityActivityAction, toggleOpportunityActivityAction } from "@/app/portal/(app)/opportunities/actions";
import type { OpportunityActivityWithAuthor } from "@/lib/portalTypes";

const TYPE_ICONS: Record<string, string> = {
  Note: "\u{1F4DD}",
  Call: "\u{1F4DE}",
  Email: "\u{2709}",
  Meeting: "\u{1F465}",
  Task: "\u{2611}",
};

// CRM-standard activity/touch log (calls, emails, meetings, tasks, notes)
// against a single opportunity -- the relationship history the original
// design had no way to record at all.
export function OpportunityActivityTimeline({
  opportunityId,
  activities,
}: {
  opportunityId: string;
  activities: OpportunityActivityWithAuthor[];
}) {
  return (
    <div>
      <h2 style={{ fontSize: "17px" }}>Activity</h2>

      <form action={addOpportunityActivityAction} className="card blueprint mt-3 space-y-2">
        <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
        <input type="hidden" name="opportunityId" value={opportunityId} />
        <div className="flex gap-2">
          <select name="activityType" defaultValue="Note" className="input" style={{ width: "auto" }}>
            <option value="Note">Note</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
            <option value="Task">Task</option>
          </select>
          <input type="date" name="dueDate" title="Due date (for tasks)" className="input" style={{ width: "auto" }} />
        </div>
        <textarea
          name="body"
          required
          rows={2}
          placeholder="What happened, or what needs to happen?"
          className="input"
        />
        <button type="submit" className="btn btn-secondary">
          Log activity
        </button>
      </form>

      {activities.length === 0 ? (
        <p className="text-muted mt-3" style={{ fontSize: "13px" }}>No activity logged yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="card blueprint flex gap-3">
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <span aria-hidden className="text-lg">
                {TYPE_ICONS[activity.activity_type] ?? "\u{1F4DD}"}
              </span>
              <div className="flex-1">
                <p style={{ fontSize: "13px", fontWeight: 500 }}>
                  {activity.activity_type} &middot; {activity.author_name}
                  {activity.due_date ? ` · due ${activity.due_date}` : ""}
                </p>
                <p className="mt-1" style={{ fontSize: "13px" }}>{activity.body}</p>
                <p className="text-muted mt-1" style={{ fontSize: "11px" }}>{activity.created_at}</p>
              </div>
              {activity.activity_type === "Task" ? (
                <form action={toggleOpportunityActivityAction}>
                  <input type="hidden" name="opportunityId" value={opportunityId} />
                  <input type="hidden" name="activityId" value={activity.id} />
                  <input type="hidden" name="completed" value={activity.completed ? "false" : "true"} />
                  <button
                    type="submit"
                    className={activity.completed ? "tag tag-accent" : "tag tag-neutral"}
                    style={{ border: 0, cursor: "pointer" }}
                  >
                    {activity.completed ? "Done" : "Mark done"}
                  </button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
