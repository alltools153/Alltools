export interface TechTemplate {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'ides_os' | 'mobile';
  icon: string;
  description: string;
  rules: string;
}

export const GITIGNORE_TEMPLATES: TechTemplate[] = [
  // 1. React / Next.js / Node
  {
    id: 'node',
    name: 'Node.js',
    category: 'frontend',
    icon: '🟩',
    description: 'npm, yarn, pnpm, node_modules & logs',
    rules: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Dependency directories
node_modules/
jspm_packages/
.pnp
.pnp.js

# Environment variables & secrets
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*.env.local

# Diagnostic & Cache
.npm
.eslintcache
.stylelintcache
.tsbuildinfo`,
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    icon: '⚛️',
    description: 'React build output, CRA, Vite, bundler artifacts',
    rules: `# Production build artifacts
build/
dist/
dist-ssr/
*.local

# Storybook & Testing
storybook-static/
coverage/
.nyc_output`,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    icon: '▲',
    description: 'Next.js .next cache, out folder & telemetry',
    rules: `# Next.js build output
.next/
out/

# Next.js telemetry & cache
.next/cache
next-env.d.ts`,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    icon: '🐍',
    description: '__pycache__, .venv, virtualenv, poetry, mypy, pytest',
    rules: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# Virtual environments
venv/
.venv/
env/
.env/
ENV/
env.bak/
venv.bak/
pip-wheel-metadata/

# Distribution / packaging
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Testing & Type checking
.tox/
.nox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.py,cover
.hypothesis/
.pytest_cache/
.mypy_cache/
.ruff_cache/`,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'backend',
    icon: '☕',
    description: 'Compiled .class, JAR/WAR, Maven target/, Gradle build/',
    rules: `# Compiled class file
*.class

# Log file
*.log

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Maven build directory
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties
.mvn/wrapper/maven-wrapper.jar

# Gradle build directory
.gradle/
build/
!src/**/build/
gradle-app.setting
!gradle-wrapper.jar
.gradletasknamecache`,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    icon: '🐳',
    description: 'Docker compose overrides, secrets, volumes',
    rules: `# Docker Compose local overrides
docker-compose.override.yml
*.override.yml

# Docker secrets & build context
.dockerignore
*.docker.log
*.tar`,
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'devops',
    icon: '🟣',
    description: 'Terraform state, lock files, provider cache',
    rules: `# Local .terraform directories
**/.terraform/*

# .tfstate files
*.tfstate
*.tfstate.*

# Crash log files
crash.log
crash.*.log

# Exclude all .tfvars files, which are likely to contain sensitive data
*.tfvars
*.tfvars.json
override.tf
override.tf.json
*_override.tf
*_override.tf.json

# CLI configuration files
.terraformrc
terraform.rc`,
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'devops',
    icon: '☸️',
    description: 'Kubeconfig, Helm charts, kustomize artifacts',
    rules: `# Kubernetes local configs & secrets
kubeconfig
.kube/
*.kubeconfig
secrets.yaml
*-secret.yaml

# Helm cache & packages
.helm/
*.tgz`,
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'ides_os',
    icon: '🟦',
    description: '.vscode/ settings, extensions & launch.json',
    rules: `# VS Code editor settings
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
!.vscode/*.code-snippets

# Local History for Visual Studio Code
.history/
*.code-workspace`,
  },
  {
    id: 'jetbrains',
    name: 'JetBrains / IntelliJ',
    category: 'ides_os',
    icon: '🧠',
    description: '.idea/, *.iml, WebStorm, PyCharm, CLion',
    rules: `# User-specific stuff
.idea/**/workspace.xml
.idea/**/tasks.xml
.idea/**/usage.statistics.xml
.idea/**/dictionaries
.idea/**/shelf

# Generated files
.idea/**/contentModel.xml
.idea/**/dataSources/
.idea/**/dataSources.local.xml

*.iml
*.iws`,
  },
  {
    id: 'macos',
    name: 'macOS',
    category: 'ides_os',
    icon: '🍎',
    description: '.DS_Store, .AppleDouble, Spotlight & Trashes',
    rules: `# macOS Finder & System files
.DS_Store
.AppleDouble
.LSOverride
Icon
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent`,
  },
  {
    id: 'windows',
    name: 'Windows',
    category: 'ides_os',
    icon: '🪟',
    description: 'Thumbs.db, desktop.ini, $RECYCLE.BIN',
    rules: `# Windows thumbnail & system cache
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db

# Folder config file
Desktop.ini
$RECYCLE.BIN/
*.cab
*.msi
*.msm
*.msp
*.lnk`,
  },
  {
    id: 'golang',
    name: 'Go',
    category: 'backend',
    icon: '🦫',
    description: 'Go binaries, test coverage, vendor/',
    rules: `# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary, built with 'go test -c'
*.test

# Output of the go coverage tool
*.out

# Dependency directory
# vendor/`,
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'backend',
    icon: '🦀',
    description: 'Rust target/ directory and cargo locks',
    rules: `# Rust compiler artifacts
/target/
**/*.rs.bk
Cargo.lock`,
  },
];

export const PRESET_BUNDLES = [
  {
    name: 'Full-Stack JavaScript (Node + React + Next + VS Code)',
    ids: ['node', 'react', 'nextjs', 'vscode', 'macos', 'windows'],
  },
  {
    name: 'Python Data Science & AI (Python + VS Code + macOS)',
    ids: ['python', 'vscode', 'macos', 'windows'],
  },
  {
    name: 'Cloud & DevOps (Docker + Terraform + Kubernetes + VS Code)',
    ids: ['docker', 'terraform', 'kubernetes', 'vscode'],
  },
  {
    name: 'Java Enterprise Suite (Java + JetBrains + VS Code)',
    ids: ['java', 'jetbrains', 'vscode', 'windows'],
  },
  {
    name: 'Modern Monorepo (Node + Next + Docker + VS Code)',
    ids: ['node', 'nextjs', 'docker', 'vscode', 'macos'],
  },
];

export function buildGitignore(selectedIds: string[], customRules = ''): string {
  const selectedTemplates = GITIGNORE_TEMPLATES.filter((t) => selectedIds.includes(t.id));

  let output = `# =========================================================================
# Created with AllToolss GitIgnore Generator Studio (https://alltoolss.com)
# Selected Technologies: ${selectedTemplates.map((t) => t.name).join(', ') || 'Custom Rules'}
# Timestamp: ${new Date().toISOString()}
# =========================================================================

`;

  selectedTemplates.forEach((t) => {
    output += `# -------------------------------------------------------------------------
# ${t.name} (${t.description})
# -------------------------------------------------------------------------
${t.rules.trim()}

`;
  });

  if (customRules.trim()) {
    output += `# -------------------------------------------------------------------------
# Custom Project Rules
# -------------------------------------------------------------------------
${customRules.trim()}

`;
  }

  return output.trim();
}
