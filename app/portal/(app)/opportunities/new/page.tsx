import { OpportunityForm } from "@/components/portal/OpportunityForm";
import { createOpportunityAction } from "../actions";

export default function NewOpportunityPage() {
  return (
    <div>
      <h1>New opportunity</h1>
      <OpportunityForm action={createOpportunityAction} />
    </div>
  );
}
