import { OpportunityForm } from "@/components/portal/OpportunityForm";
import { createOpportunityAction } from "../actions";

export default function NewOpportunityPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-charcoal">New opportunity</h1>
      <OpportunityForm action={createOpportunityAction} />
    </div>
  );
}
