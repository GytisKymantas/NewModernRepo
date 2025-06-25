# Pre-commit Hook Documentation

## Overview

This project uses an enhanced pre-commit hook that ensures code quality by running comprehensive checks before allowing any commits. The hook is designed to catch issues early and maintain consistent code standards across the project.

## What the Hook Checks

### 1. TypeScript Compilation ✅

- **Purpose**: Ensures all TypeScript code compiles without errors
- **Command**: `npx tsc --noEmit --skipLibCheck --declaration false --emitDeclarationOnly false`
- **Why it matters**: Catches type errors and syntax issues before they reach the repository

### 2. ESLint (Strict Mode) ✅

- **Purpose**: Enforces code quality and style rules with zero tolerance for warnings
- **Command**: `npm run lint -- --max-warnings 0`
- **What's different**: Unlike regular linting, this treats ALL warnings as errors
- **Why it matters**: Maintains consistently high code quality standards

### 3. Prettier Code Formatting ✅

- **Purpose**: Ensures consistent code formatting across the entire codebase
- **Command**: `npm run check-format`
- **Auto-fix**: Run `npm run format` to automatically fix formatting issues
- **Why it matters**: Eliminates formatting debates and maintains readable code

### 4. Optional Checks (Currently Disabled)

The hook includes optional checks that can be enabled by uncommenting them:

#### Tests 🧪

```bash
# Uncomment to enable test execution on every commit
npm run test -- --passWithNoTests --watchAll=false
```

#### Build Verification 🏗️

```bash
# Uncomment to verify the project builds successfully
npm run build > /dev/null 2>&1
```

## How It Works

1. **Comprehensive Error Reporting**: Clear, emoji-enhanced messages explain what failed
2. **Early Exit**: Stops at the first failure to save time
3. **Helpful Suggestions**: Provides specific commands to fix issues
4. **Zero-Error Policy**: Blocks commits if ANY errors or warnings are found

## Example Output

### Success ✅

```
🔍 Running pre-commit checks...
🔧 Checking TypeScript compilation...
✅ TypeScript compilation passed
📝 Running ESLint (strict mode)...
✅ ESLint checks passed
🎨 Checking code formatting...
✅ Code formatting is correct

🎉 All pre-commit checks passed! Your code is ready to commit.
```

### Failure ❌

```
🔍 Running pre-commit checks...
🔧 Checking TypeScript compilation...
✅ TypeScript compilation passed
📝 Running ESLint (strict mode)...
❌ ESLint failed. Please fix all linting errors and warnings before committing.
🚫 Commit blocked. Please fix the issues above before committing.
```

## Benefits

- **Early Error Detection**: Catches issues before they reach the repository
- **Consistent Code Quality**: Enforces standards across all commits
- **Automated Quality Gate**: No manual oversight needed
- **Time Saving**: Prevents broken code from entering the main branch
- **Team Collaboration**: Ensures everyone follows the same standards

## Enabling Optional Checks

To enable tests or build verification:

1. Open `.git/hooks/pre-commit`
2. Uncomment the desired section by removing the `# ` from each line
3. Save the file

## Troubleshooting

### Hook Not Running

- Ensure the hook file is executable: `chmod +x .git/hooks/pre-commit`
- Check that you're committing from the project root directory

### TypeScript Errors

- Run `npx tsc --noEmit` to see detailed error messages
- Fix type errors in your code before committing

### ESLint Warnings/Errors

- Run `npm run lint` to see all issues
- Fix each issue individually or use auto-fix where possible

### Formatting Issues

- Run `npm run format` to automatically fix most formatting issues
- Manually adjust any remaining formatting problems

## Configuration Files

The pre-commit hook relies on these configuration files:

- `tsconfig.json` - TypeScript configuration
- `.eslintrc.cjs` - ESLint rules and settings
- `.prettierrc` - Prettier formatting rules

## Maintenance

The pre-commit hook is automatically installed and doesn't require regular maintenance. However, you may want to:

- Review and update linting rules periodically
- Enable additional checks as the project matures
- Adjust the strictness level based on team needs

## Performance

The hook typically runs in 10-30 seconds depending on project size:

- TypeScript check: ~5-10 seconds
- ESLint check: ~5-15 seconds
- Prettier check: ~2-5 seconds

This investment in time saves hours of debugging and code review later.
