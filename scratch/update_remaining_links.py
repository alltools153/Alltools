import os

files_to_update = [
    'src/components/Navbar.tsx',
    'src/components/Footer.tsx',
    'src/components/docforge/tool-card.tsx',
    'src/components/docforge/quick-upload-picker.tsx',
    'src/app/resume-ats-checker/page.tsx',
]

for rel_path in files_to_update:
    if os.path.exists(rel_path):
        with open(rel_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace /document-tools/[tool] with /tools/[tool]
        content = content.replace('/document-tools/merge-pdf', '/tools/merge-pdf')
        content = content.replace('/document-tools/split-pdf', '/tools/split-pdf')
        content = content.replace('/document-tools/compress-pdf', '/tools/compress-pdf')
        content = content.replace('/document-tools/word-to-pdf', '/tools/word-to-pdf')
        content = content.replace('/document-tools/ocr-pdf', '/tools/ocr-pdf')
        content = content.replace('href={`/document-tools/${tool.slug}`}', 'href={`/tools/${tool.slug}`}')
        content = content.replace('router.push(`/document-tools/${selectedTool}`)', 'router.push(`/tools/${selectedTool}`)')
        
        with open(rel_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {rel_path}")

print("All remaining links updated to canonical /tools/[slug] format.")
