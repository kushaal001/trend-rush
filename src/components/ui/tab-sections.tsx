"use client";

import {
	Tabs,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";

export interface TabItem {
	value: string | number;
	name: string;
}

export interface TabSectionsProps {
	defaultValue: string | number;
	tabs: TabItem[];
	className?: string;
	onChange?: (value: string) => void;
}

export function TabSections({
	defaultValue,
	tabs,
	className,
	onChange,
}: TabSectionsProps) {
	const [activeTab, setActiveTab] = useState(String(defaultValue));

	const handleChange = (value: string) => {
		setActiveTab(String(value));
		onChange?.(value);
	};

	return (
		<Tabs value={activeTab} onValueChange={handleChange} className={`w-full ${className}`}>
			<div className="overflow-x-auto pb-2">
				<TabsList >
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={String(tab.value)}
						>
							{tab.name}
						</TabsTrigger>
					))}
				</TabsList>
			</div>
		</Tabs>
	);
}
