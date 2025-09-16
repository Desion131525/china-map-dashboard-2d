import subprocess
import os
import re

# 获取任务名称

def get_task_name(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r'^name:\s*(.+)$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return None

def create_task_issue(task_file, task_name):
    # 提取内容（去掉frontmatter）
    with open(task_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 移除frontmatter
    lines = content.split('\n')
    in_frontmatter = False
    body_lines = []
    frontmatter_count = 0

    for line in lines:
        if line.strip() == '---':
            frontmatter_count += 1
            if frontmatter_count == 2:
                in_frontmatter = False
            else:
                in_frontmatter = True
            continue
        if not in_frontmatter and frontmatter_count >= 2:
            body_lines.append(line)

    body_content = '\n'.join(body_lines)

    # 写入临时文件
    with open('/tmp/task_body.md', 'w', encoding='utf-8') as f:
        f.write(body_content)

    # 创建GitHub issue
    try:
        result = subprocess.run([
            'gh', 'issue', 'create',
            '--title', task_name,
            '--body-file', '/tmp/task_body.md',
            '--label', 'task',
            '--label', 'epic:china-2d-map-drilldown-dashboard'
        ], capture_output=True, text=True, check=True)
        print(f"Created task: {task_name}")
        print(f"Result: {result.stdout}")
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error creating task {task_name}: {e.stderr}")
        return None

# 主程序
task_dir = '.claude/epics/china-2d-map-drilldown-dashboard'
task_files = []

for i in range(1, 11):
    file_num = f"{i:03d}"
    task_file = f"{task_dir}/{file_num}.md"
    if os.path.exists(task_file):
        task_files.append(task_file)

print(f"Found {len(task_files)} task files")

for task_file in task_files:
    task_name = get_task_name(task_file)
    if task_name:
        print(f"Creating task: {task_name}")
        create_task_issue(task_file, task_name)
    else:
        print(f"Could not extract name from {task_file}")