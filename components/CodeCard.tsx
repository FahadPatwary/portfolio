/** A "profile.ts" card: a creative, software-flavoured About visual. Real text is in the paragraph beside it. */
export default function CodeCard() {
  return (
    <figure className="card overflow-hidden" aria-label="Profile summary as code">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface2 px-4 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">profile.ts</span>
      </div>
      <pre className="code overflow-x-auto p-4 text-ink"><code>
<span className="k">const</span> fahad = {"{"}{"\n"}
{"  "}role: <span className="s">&quot;Software Engineer&quot;</span>,{"\n"}
{"  "}designs: [<span className="s">&quot;System architecture&quot;</span>, <span className="s">&quot;Research&quot;</span>],{"\n"}
{"  "}stack: [<span className="s">&quot;Next.js&quot;</span>, <span className="s">&quot;Firebase&quot;</span>, <span className="s">&quot;Python&quot;</span>],{"\n"}
{"  "}tests: [<span className="s">&quot;pytest&quot;</span>, <span className="s">&quot;Selenium&quot;</span>, <span className="s">&quot;Appium&quot;</span>],{"\n"}
{"  "}research: <span className="s">&quot;Green AI &amp; ML&quot;</span>,{"\n"}
{"  "}education: <span className="s">&quot;UIU CSE&quot;</span>,{"\n"}
{"  "}base: <span className="s">&quot;Dhaka&quot;</span>,{"\n"}
{"  "}openTo: <span className="s">&quot;SWE · SQA · R&amp;D&quot;</span>,{"\n"}
{"}"};<span className="caret ml-1" />
      </code></pre>
    </figure>
  );
}
