export function formatPaginationInfo(template: string, from: number, to: number, total: number): string {
  return template
    .replaceAll('{from}', String(from))
    .replaceAll('{to}', String(to))
    .replaceAll('{total}', String(total));
}
