/**
 * {{ACTION_NAME}} Server Action
 * {{DESCRIPTION}}
 */

'use server';

{{IMPORTS}}

// Types
interface {{ACTION_NAME}}Input {
  {{INPUT_FIELDS}}
}

interface {{ACTION_NAME}}Result {
  success: boolean;
  data?: {{RESULT_DATA_TYPE}};
  error?: string;
}

/**
 * {{ACTION_DESCRIPTION}}
 */
export async function {{ACTION_NAME}}(
  input: {{ACTION_NAME}}Input
): Promise<{{ACTION_NAME}}Result> {
  try {
    {{VALIDATION}}

    {{AUTHENTICATION_CHECK}}

    {{BUSINESS_LOGIC}}

    return {
      success: true,
      data: {{SUCCESS_DATA}},
    };
  } catch (error) {
    console.error('{{ACTION_NAME}} error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : '{{DEFAULT_ERROR_MESSAGE}}',
    };
  }
}
