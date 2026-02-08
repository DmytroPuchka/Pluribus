/**
 * {{ENDPOINT_NAME}} API Route
 * {{DESCRIPTION}}
 *
 * Endpoint: {{METHOD}} {{ROUTE}}
 */

import { NextRequest, NextResponse } from 'next/server';
{{IMPORTS}}

// Types
interface {{REQUEST_TYPE}} {
  {{REQUEST_FIELDS}}
}

interface {{RESPONSE_TYPE}} {
  {{RESPONSE_FIELDS}}
}

/**
 * {{METHOD}} {{ROUTE}}
 * {{METHOD_DESCRIPTION}}
 */
export async function {{METHOD}}(
  request: NextRequest,
  { params }: { params: { {{PARAMS}} } }
) {
  try {
    {{VALIDATION}}

    {{BUSINESS_LOGIC}}

    return NextResponse.json<{{RESPONSE_TYPE}}>(
      {{SUCCESS_RESPONSE}},
      { status: {{SUCCESS_STATUS}} }
    );
  } catch (error) {
    console.error('{{ENDPOINT_NAME}} error:', error);

    return NextResponse.json(
      { error: '{{ERROR_MESSAGE}}' },
      { status: {{ERROR_STATUS}} }
    );
  }
}
