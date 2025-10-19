<script lang="ts">
  /**
   * FooterNewsletter - Newsletter signup form for footer
   *
   * @example
   * ```svelte
   * <FooterNewsletter
   *   onSubmit={(email) => console.log(email)}
   *   placeholder="Enter your email"
   *   buttonText="Subscribe"
   * />
   * ```
   */

  interface Props {
    /**
     * Newsletter signup handler
     */
    onSubmit?: (email: string) => void;

    /**
     * Placeholder text for email input
     */
    placeholder?: string;

    /**
     * Button text
     */
    buttonText?: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    onSubmit = undefined,
    placeholder = 'Enter your email',
    buttonText = 'Subscribe',
    class: className = ''
  }: Props = $props();

  let email = $state('');

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (onSubmit && email) {
      onSubmit(email);
      email = '';
    }
  }
</script>

<form class="card-footer-newsletter {className}" on:submit={handleSubmit}>
  <input
    type="email"
    bind:value={email}
    {placeholder}
    required
  />
  <button type="submit">{buttonText}</button>
</form>
