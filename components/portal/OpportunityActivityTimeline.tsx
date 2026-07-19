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
      <h2 className="font-headline text-lg font-bold text-charcoal">Activity</h2>

      <form action={addOpportunityActivityAction} className="mt-3 space-y-2 rounded-md border border-charcoal/10 p-3">
        <input type="hidden" name="opportunityId" value={opportunityId} />
        <div className="flex gap-2">
          <select
            name="activityType"
            defaultValue="Note"
            className="rounded-md border border-charcoal/20 px-2 py-2 font-body text-sm"
          >
            <option value="Note">Note</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
            <option value="Task">Task</option>
          </select>
          <input
            type="date"
            name="dueDate"
            title="Due date (for tasks)"
            className="rounded-md border border-charcoal/20 px-2 py-2 font-body text-sm"
          />
        </div>
        <textarea
          name="body"
          required
          rows={2}
          placeholder="What happened, or what needs to happen?"
          className="w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
        />
        <button
          type="submit"
          className="rounded-md border border-charcoal/20 px-4 py-2 font-body text-sm text-charcoal hover:border-evergreen"
        >
          Log activity
        </button>
      </form>

      {activities.length === 0 ? (
        <p className="mt-3 font-body text-sm text-charcoal/50">No activity logged yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="flex gap-3 rounded-md border border-charcoal/10 p-3">
              <span aria-hidden className="text-lg">
                {TYPE_ICONS[activity.activity_type] ?? "\u{1F4DD}"}
              </span>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-charcoal">
                  {activity.activity_type} &middot; {activity.author_name}
                  {activity.due_date ? ` · due ${activity.due_date}` : ""}
                </p>
                <p className="mt-1 font-body text-sm text-charcoal/80">{activity.body}</p>
                <p className="mt-1 font-body text-xs text-charcoal/40">{activity.created_at}</p>
              </div>
              {activity.activity_type === "Task" ? (
                <form action={toggleOpportunityActivityAction}>
                  <input type="hidden" name="opportunityId" value={opportunityId} />
                  <input type="hidden" name="activityId" value={activity.id} />
                  <input type="hidden" name="completed" value={activity.completed ? "false" : "true"} />
                  <button
                    type="submit"
                    className={`rounded-md border px-2 py-1 font-body text-xs ${
                      activity.completed
                        ? "border-evergreen text-evergreen"
                        : "border-charcoal/20 text-charcoal/60 hover:border-evergreen"
                    }`}
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
