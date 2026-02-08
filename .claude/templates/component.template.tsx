/**
 * {{COMPONENT_NAME}} Component
 * {{DESCRIPTION}}
 *
 * @component
 * @example
 * ```tsx
 * <{{COMPONENT_NAME}} {{EXAMPLE_PROPS}} />
 * ```
 */

{{USE_CLIENT}}

import { FC } from 'react';
{{IMPORTS}}

// Types
interface {{COMPONENT_NAME}}Props {
  {{PROPS}}
}

// Component
export const {{COMPONENT_NAME}}: FC<{{COMPONENT_NAME}}Props> = ({
  {{DESTRUCTURED_PROPS}}
}) => {
  return (
    <div className="{{BASE_CLASSES}}">
      {{CONTENT}}
    </div>
  );
};

{{COMPONENT_NAME}}.displayName = '{{COMPONENT_NAME}}';

export default {{COMPONENT_NAME}};
