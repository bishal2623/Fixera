'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemePicker } from "@/components/theme-picker";
import { Paintbrush } from "lucide-react";

export default function SettingsPage() {
    const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

    return (
      <div className="min-h-screen w-full flex flex-col">
         <header className="bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center gap-4 sticky top-0 z-10">
            <div className="flex-1">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">
                Manage your account and application settings
            </p>
            </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 rounded-lg border bg-secondary/30">
                        <div className="space-y-1">
                            <Label>Theme</Label>
                            <p className="text-sm text-muted-foreground">Select a visual theme for the entire application.</p>
                        </div>
                        <Button onClick={() => setIsThemePickerOpen(true)} variant="outline">
                            <Paintbrush className="mr-2" />
                            Customize
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <Switch id="email-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <Switch id="push-notifications" disabled />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>AI Tutor Preferences</CardTitle>
                    <CardDescription>Customize your learning experience.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="learning-style">Preferred Learning Style</Label>
                        <Select defaultValue="socratic">
                            <SelectTrigger id="learning-style">
                                <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="socratic">Socratic</SelectItem>
                                <SelectItem value="step-by-step">Step-by-Step</SelectItem>
                                <SelectItem value="analogies">With Analogies</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </main>
        <ThemePicker open={isThemePickerOpen} onOpenChange={setIsThemePickerOpen} />
      </div>
    );
}
