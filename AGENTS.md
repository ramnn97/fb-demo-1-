<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the homepage's cursor-driven orbit in the home route and its visual tokens/layout in the global stylesheet; this separates interaction state from the reference-inspired design system.
- The client scroll story lives in src/routes/client.tsx with its scroll engine in-file and visual tokens in the global stylesheet, mirroring the home orbit separation; the home navbar links to it as "Client".
