# Code-Corpus-v1

**Code-Corpus-v1** is a curated dataset of high-quality Python and TypeScript code.

## Dataset Summary

- **Size:** 500GB
- **Languages:** Python, TypeScript
- **Source:** GitHub repositories with permissive licenses

## Use Cases

- Training Large Language Models (LLMs) for code
- Code analysis and static analysis research
- Automated code completion systems

## Structure

The dataset is organized as follows:

| Feature | Description |
| :--- | :--- |
| `repo_name` | Name of the repository |
| `file_path` | Path to the file |
| `content` | Source code content |
| `license` | License type |

## Access

```python
from datasets import load_dataset

dataset = load_dataset("code-corpus/v1")
print(dataset['train'][0])
```
