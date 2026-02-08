/**
 * {{PAGE_NAME}} Page
 * {{DESCRIPTION}}
 *
 * Route: {{ROUTE}}
 */

import { Metadata } from 'next';
{{IMPORTS}}

// Metadata
export const metadata: Metadata = {
  title: '{{TITLE}} | Pluribus',
  description: '{{META_DESCRIPTION}}',
};

// Types
interface {{PAGE_NAME}}Props {
  params: { {{PARAMS}} };
  searchParams: { {{SEARCH_PARAMS}} };
}

// Page Component
export default async function {{PAGE_NAME}}Page({
  params,
  searchParams,
}: {{PAGE_NAME}}Props) {
  {{SERVER_LOGIC}}

  return (
    <div className="{{CONTAINER_CLASSES}}">
      {{CONTENT}}
    </div>
  );
}
