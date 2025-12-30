'use client';

import { useParams } from 'next/navigation';
import { WorkflowBuilder } from '@/components/workflow/workflow-builder';

export default function WorkflowPage() {
  const params = useParams();
  const workflowId = params.id as string;

  return (
    <div className="h-screen w-screen bg-background text-foreground">
      <WorkflowBuilder workflowId={workflowId} />
    </div>
  );
}
