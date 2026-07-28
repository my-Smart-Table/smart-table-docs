# Condition Node

The Condition node is used in workflows to route to different branches based on conditions, enabling complex business logic control. Each condition node can contain multiple branches; the system matches branch conditions in order, and the first matching branch is executed.

## When to Use

- Decide approval flow based on order amount
- Choose notification method based on task priority
- Assign different salespeople based on customer type
- Check whether records meet certain conditions before executing subsequent operations

## Configuration

### Branches

Each condition node contains one or more branches:

| Configuration | Description |
| --- | --- |
| Branch Name | Name for easy identification |
| Condition Combination | AND (all conditions met) or OR (any condition met) |
| Condition List | Specific field, operator, and value |

### Default Branch

When all condition branches do not match, the default branch is executed (if configured). The default branch does not need to set conditions.

::: tip Suggestion
Configure a default branch for condition nodes to avoid workflow interruption when no conditions are met.
:::

### Condition Settings

Each condition contains:

- **Field**: Select a field from the current record or previous node results.
- **Operator**: Equals, not equals, greater than, less than, contains, is empty, etc.
- **Value**: Static value or reference expression.

### Condition Combination

- **All conditions met (AND)**: The branch is matched only when all conditions are met.
- **Any condition met (OR)**: The branch is matched when any condition is met.

## Execution Logic

1. When the workflow reaches a condition node, branches are evaluated in order.
2. After a branch is matched, the subsequent nodes of that branch are executed.
3. If no branch matches and there is no default branch, the flow after the condition node terminates.

## Example

### Example: Branch by order amount

| Branch Name | Condition |
| --- | --- |
| Large Order | Amount > 100000 |
| Medium Order | Amount > 10000 AND Amount <= 100000 |
| Small Order | Default branch |

Subsequently, you can add additional approval nodes for large orders and send normal notifications for medium orders.

## Notes

- Condition nodes cannot be placed inside loop bodies.
- Branch order is important; the system matches from top to bottom.
- The data type of condition values must match the field type.
