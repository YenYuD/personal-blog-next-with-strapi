import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/custom/CardWrapper';

export default function HomePage() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<div className="grid gap-6">
				<CardWrapper
					title="About"
					description="Used to identify your store in the marketplace."
					footer={<Button>Save</Button>}
				>
					<form>
						<Input placeholder="Store Name" />
					</form>
				</CardWrapper>
				<CardWrapper
					title="Tech Stacks"
					description="The directory within your project, in which your plugins are located."
					footer={
						<div className="flex items-center space-x-2">
							<Checkbox id="include" defaultChecked />
							<label
								htmlFor="include"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Allow administrators to change the directory.
							</label>
						</div>
					}
				>
					<form className="flex flex-col gap-4">
						<Input placeholder="Project Name" defaultValue="/content/plugins" />
					</form>
				</CardWrapper>
			</div>
		</div>
	);
}
