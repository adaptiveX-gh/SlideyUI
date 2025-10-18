<script lang="ts">
  let { themeName = 'Corporate', colors = {}, fonts = {} } = $props<{
    themeName: string;
    colors?: Record<string, string>;
    fonts?: Record<string, string>;
  }>();

  const defaultColors = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    neutral: '#3d4451',
    background: '#ffffff',
    text: '#1f2937',
  };

  const defaultFonts = {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    code: 'Fira Code, monospace',
  };

  const themeColors = { ...defaultColors, ...colors };
  const themeFonts = { ...defaultFonts, ...fonts };
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h3 class="card-title text-2xl">{themeName}</h3>

    <div class="divider">Colors</div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each Object.entries(themeColors) as [name, color]}
        <div class="flex flex-col gap-2">
          <div
            class="h-16 rounded-lg shadow-md"
            style="background-color: {color}"
          ></div>
          <div class="text-xs">
            <div class="font-semibold capitalize">{name}</div>
            <div class="text-base-content/60">{color}</div>
          </div>
        </div>
      {/each}
    </div>

    <div class="divider">Typography</div>
    <div class="space-y-4">
      {#each Object.entries(themeFonts) as [name, font]}
        <div>
          <div class="text-xs text-base-content/60 mb-1 capitalize">{name}</div>
          <div class="text-lg" style="font-family: {font}">
            The quick brown fox jumps over the lazy dog
          </div>
          <div class="text-xs text-base-content/60 mt-1">{font}</div>
        </div>
      {/each}
    </div>

    <div class="divider">Preview</div>
    <div class="slide-preview p-8 flex flex-col justify-center items-center text-center">
      <h1 class="text-4xl font-bold mb-4" style="color: {themeColors.primary}">
        Sample Slide Title
      </h1>
      <p class="text-xl mb-6" style="color: {themeColors.text}">
        This is how your presentation will look with the {themeName} theme.
      </p>
      <button class="btn btn-primary">Call to Action</button>
    </div>
  </div>
</div>
