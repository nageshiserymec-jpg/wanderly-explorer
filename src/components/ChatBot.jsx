import { Loader2, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { askTravelAssistant } from "../services/geminiApi";

export default function ChatBot({ destination }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  const suggestions = [
    `What should I do in ${destination.name}?`,
    "What is the best time to visit?",
    "What should I eat?",
    "Is it good for families?",
  ];

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = async (text) => {
    const question = text.trim();
    if (!question || sending) return;

    const history = [...messages, { role: "user", content: question }];
    setMessages(history);
    setInput("");
    setError("");
    setSending(true);

    try {
      const { reply } = await askTravelAssistant({
        destination: destination.name,
        country: destination.country,
        history,
      });
      setMessages([...history, { role: "assistant", content: reply }]);
    } catch (caught) {
      setError(caught?.message ?? "Sorry, the assistant is temporarily unavailable.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="surface-card flex h-full flex-col overflow-hidden">
      <header className="flex items-center gap-3 border-b border-border p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-accent">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-base font-extrabold text-foreground">AI travel assistant</h3>
          <p className="text-xs text-muted-foreground">Ask anything about {destination.name}</p>
        </div>
      </header>

      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with the travel assistant"
        className="flex-1 space-y-4 overflow-y-auto p-5"
        style={{ minHeight: "18rem", maxHeight: "26rem" }}
      >
        {messages.length === 0 && !sending ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              No questions yet. Try one of these to get started:
            </p>
            <ul className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() => send(suggestion)}
                    className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`animate-rise flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              <span className="sr-only">{message.role === "user" ? "You said: " : "Assistant said: "}</span>
              {message.content}
            </p>
          </div>
        ))}

        {sending ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-accent" aria-hidden="true" />
            AI is thinking...
          </p>
        ) : null}

        {error ? (
          <div role="alert" className="rounded-2xl bg-destructive/10 px-4 py-3">
            <p className="text-sm font-semibold text-destructive">{error}</p>
            <button
              type="button"
              onClick={() => {
                const last = [...messages].reverse().find((m) => m.role === "user");
                setMessages(messages.filter((m) => m !== last));
                if (last) send(last.content);
              }}
              className="mt-1 text-sm font-bold text-accent"
            >
              Try again
            </button>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border p-4"
      >
        <label htmlFor="chat-input" className="sr-only">
          Ask something about {destination.name}
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={`Ask something about ${destination.name}...`}
          className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only sm:not-sr-only">Send</span>
        </button>
      </form>
    </section>
  );
}
