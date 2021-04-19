export interface Disposable {
  dispose(): Promise<void>
}

export async function using<T extends Disposable>(
  resource: T,
  executer: (resource: T) => void,
) {
  try {
    await executer(resource)
  } finally {
    await resource.dispose()
  }
}
