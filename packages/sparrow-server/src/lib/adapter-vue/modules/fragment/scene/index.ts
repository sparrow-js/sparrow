export function initBlock (index: number) {
  return `
    <div class="block-list">
      <box :index="${index}" class="block-item">
        <paragraph></paragraph>
      </box>
    </div>`
}

export function blockList (index: number, content: string) {
  return `
    <div class="block-list">
      ${content}
    </div>
  `;
}

export function paragraph () {
  return `
    <paragraph></paragraph>
  `;
}