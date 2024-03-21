"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { InsertTodo, SelectTodo, insetTodo } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import useSWR from "swr";
import { Check, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
    const fetcher = (url: string) =>
        fetch(url)
            .then((r) => r.json())
            .then((d) => d.data);
    const { data } = useSWR<SelectTodo[]>("/api/todo", fetcher, {
        refreshInterval: 2000,
    });
    const [todo, setTodo] = useState("");
    const [hoverId, setHoverId] = useState<number | null>(null);
    const [selectedTodo, setSelectedTodo] = useState<SelectTodo>({
        id: NaN,
        createAt: "",
        isCompleted: false,
        todo: "",
    });
    const [error, setError] = useState({
        error: false,
        message: "",
    });
    const handleCreateTodo = useCallback(async () => {
        try {
            if (todo) {
                const validation = insetTodo.safeParse({ todo });
                if (!validation.success) {
                    setError({
                        error: true,
                        message: "Invalid todo!",
                    });
                }
                const res = await fetch("/api/todo", {
                    method: "POST",
                    body: JSON.stringify({ todo }),
                });
                const data = await res.json();
                if (data.status === "success") {
                    toast("Todo has been created.", {
                        description: new Date().toLocaleDateString(undefined, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }),
                    });
                    setTodo("");
                    setError({ error: false, message: "" });
                } else {
                    setError({
                        error: true,
                        message: "Invalid todo!",
                    });
                }
            } else {
                setError({
                    error: true,
                    message: "Todo is empty!",
                });
            }
        } catch (e) {
            toast("Something went wrong while create todo.");
        }
    }, [todo]);

    const handleEditTodo = async (id: number, todo: InsertTodo) => {
        try {
            const res = await fetch(`/api/todo/${id}`, {
                method: "PATCH",
                body: JSON.stringify(todo),
            });
            const data = await res.json();
            if (data.status === "success") {
                toast("Todo has been updated.", {
                    description: new Date().toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                });
            } else {
                toast("Failed to update todo.");
            }
        } catch (e) {
            toast("Something went wrong while update todo.");
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            const res = await fetch(`/api/todo/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.status === "success") {
                toast("Todo has been deleted.", {
                    description: new Date().toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                });
            } else {
                toast("Failed to delete todo.");
            }
        } catch (e) {
            toast("Something went wrong while delete todo.");
        }
    };

    return (
        <main className="relative mx-auto flex min-h-screen max-w-lg flex-col items-center justify-between p-8">
            <Command>
                <CommandInput placeholder="Type to search todo..." />
                <CommandList>
                    <CommandEmpty>
                        No result. Create a new one instead!
                    </CommandEmpty>
                    <CommandGroup>
                        {data &&
                            data.map((T) => {
                                return (
                                    <CommandItem
                                        key={T.id}
                                        className="my-2 flex w-full flex-row items-center justify-between border"
                                        onMouseEnter={() => {
                                            setHoverId(T.id);
                                        }}
                                    >
                                        <div className="flex h-10 flex-row items-center gap-2">
                                            <span className="flex flex-col gap-1">
                                                <label
                                                    className={cn(
                                                        T.isCompleted
                                                            ? "text-zinc-400 line-through"
                                                            : ""
                                                    )}
                                                >
                                                    {T.todo}
                                                </label>
                                                <label className="text-xs font-light text-zinc-400">
                                                    {new Date(
                                                        T.createAt
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </label>
                                            </span>

                                            {T.isCompleted && (
                                                <Badge variant="default">
                                                    completed
                                                </Badge>
                                            )}
                                        </div>
                                        {hoverId === T.id && (
                                            <div className="flex flex-row gap-1">
                                                {!T.isCompleted && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    className="rounded-full p-3"
                                                                    variant={
                                                                        "ghost"
                                                                    }
                                                                    onClick={() => {
                                                                        handleEditTodo(
                                                                            T.id,
                                                                            {
                                                                                ...T,
                                                                                isCompleted:
                                                                                    true,
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    <Check
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>
                                                                    Mark as
                                                                    completed
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        className="rounded-full p-3"
                                                                        variant={
                                                                            "ghost"
                                                                        }
                                                                        onClick={() => {
                                                                            setSelectedTodo(
                                                                                T
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Pencil
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>
                                                                        Edit
                                                                        todo
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Edit todo
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Make changes to
                                                                your todo here.
                                                                Click save when
                                                                you're done.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <label className="text-right">
                                                                    Title
                                                                </label>
                                                                <Input
                                                                    value={
                                                                        selectedTodo?.todo
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSelectedTodo(
                                                                            {
                                                                                ...selectedTodo,
                                                                                todo: e
                                                                                    .target
                                                                                    .value,
                                                                            }
                                                                        )
                                                                    }
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="flex items-center justify-end space-x-2">
                                                                <Checkbox
                                                                    checked={
                                                                        selectedTodo?.isCompleted
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
                                                                        setSelectedTodo(
                                                                            {
                                                                                ...selectedTodo,
                                                                                isCompleted:
                                                                                    checked as boolean,
                                                                            }
                                                                        );
                                                                    }}
                                                                />
                                                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                                    Mark as
                                                                    completed
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose>
                                                                <Button
                                                                    onClick={() => {
                                                                        handleEditTodo(
                                                                            selectedTodo.id,
                                                                            selectedTodo
                                                                        );
                                                                    }}
                                                                >
                                                                    Save changes
                                                                </Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                className="rounded-full p-3"
                                                                variant={
                                                                    "ghost"
                                                                }
                                                                onClick={() => {
                                                                    handleDeleteTodo(
                                                                        T.id
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2
                                                                    size={16}
                                                                />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Delete todo</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        )}
                                    </CommandItem>
                                );
                            })}
                    </CommandGroup>
                </CommandList>
            </Command>
            <div className="sticky bottom-8 flex w-full max-w-lg items-center space-x-2">
                <Toaster />
                <Input
                    className={cn(error.error && "border border-red-500")}
                    type="text"
                    name="todo"
                    placeholder={
                        error.error ? error.message : "What's your todo today?"
                    }
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onFocus={() => {
                        setError({ error: false, message: "" });
                    }}
                    onKeyDown={(e) => {
                        if (e.which == 13) {
                            handleCreateTodo();
                        }
                    }}
                />
                <Button onClick={handleCreateTodo}>Add</Button>
            </div>
        </main>
    );
}
