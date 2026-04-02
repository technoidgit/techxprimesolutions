import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ThemeContext } from "../context/ThemeContext";
import { IconMap } from "../constants";
import ShareButtons from "../components/common/ShareButtons";

interface DetailPageProps {
    title: string;
    description: string;
    content: string;
    features?: string[];
    category?: string;
    client?: string;
    year?: string;
    results?: string[];
    challenge?: string;
    solution?: string;
    author?: string;
    date?: string;
    icon?: string;
    thumbnail_light?: string;
    thumbnail_dark?: string;
    impact?: string;
    keyPoints?: string[];
    children?: React.ReactNode;
}

const DetailPage = ({ title, description, content, features, category, client, year, results, challenge, solution, author, date, icon, thumbnail_light, thumbnail_dark, impact, keyPoints, children }: DetailPageProps) => {
    const { isDark } = useContext(ThemeContext);
    const thumbnail = isDark ? thumbnail_dark : thumbnail_light;

    return (
        <div className="pt-0 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        {icon && <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500">{IconMap[icon] || <Rocket className="w-6 h-6" />}</div>}
                        {category && <span className="px-4 py-1.5 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full uppercase tracking-wider">{category}</span>}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">{title}</h1>
                    <p className="text-2xl text-foreground/60 leading-relaxed">{description}</p>
                    <ShareButtons title={title} />
                </div>

                {(client || year || author || date) && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-foreground/10">
                        {client && (
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-2">Client</p>
                                <p className="font-bold">{client}</p>
                            </div>
                        )}
                        {year && (
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-2">Year</p>
                                <p className="font-bold">{year}</p>
                            </div>
                        )}
                        {author && (
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-2">Author</p>
                                <p className="font-bold">{author}</p>
                            </div>
                        )}
                        {date && (
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-2">Date</p>
                                <p className="font-bold">{date}</p>
                            </div>
                        )}
                    </div>
                )}

                {thumbnail && (
                    <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-foreground/10">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                )}

                <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-foreground/80">
                    <Markdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <div className="rounded-2xl overflow-hidden my-8 border border-foreground/10">
                                        <div className="bg-foreground/5 px-4 py-2 text-xs font-mono opacity-40 border-b border-foreground/10 flex justify-between items-center">
                                            <span>{match[1]}</span>
                                        </div>
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{
                                                margin: 0,
                                                padding: "1.5rem",
                                                fontSize: "0.9rem",
                                                lineHeight: "1.5",
                                                background: "transparent"
                                            }}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className={`${className} bg-foreground/10 px-1.5 py-0.5 rounded-md text-sm font-mono`} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {content}
                    </Markdown>
                </div>

                {children}

                {impact && (
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">The Impact</h2>
                        <div className="text-xl opacity-70 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: impact }} />
                    </div>
                )}

                {challenge && (
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">The Challenge</h2>
                        <div className="text-xl opacity-70 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: challenge }} />
                    </div>
                )}

                {solution && (
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">The Solution</h2>
                        <div className="text-xl opacity-70 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: solution }} />
                    </div>
                )}

                {features && features.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-foreground/5 rounded-2xl border border-foreground/10">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {results && results.length > 0 && (
                    <div className="p-10 rounded-[3rem] bg-foreground text-background space-y-8">
                        <h2 className="text-3xl font-bold">Impact & Results</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {results.map((result, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                    </div>
                                    <p className="text-lg opacity-80">{result}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {keyPoints && keyPoints.length > 0 && (
                    <div className="p-8 bg-foreground/5 rounded-3xl border border-foreground/10 space-y-6">
                        <h3 className="text-2xl font-bold">Key Takeaways</h3>
                        <div className="space-y-4">
                            {keyPoints.map((point, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                                    <p className="opacity-80 text-lg">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-12 border-t border-foreground/10">
                    <Link to="/" className="inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-4 transition-all">
                        <ArrowRight className="w-5 h-5 rotate-180" /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
