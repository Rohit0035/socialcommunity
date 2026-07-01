"use client";

import {
	Button,
	Card,
	CardBody,
} from "reactstrap";

import { BsCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CPSuccessStep = () => {
	return (
		<Card className="cp-post-card">
			<CardBody className="text-center py-5">

				<BsCheckCircleFill
					size={80}
					className="text-success mb-4"
				/>

				<h3 className="mb-3">
					Post Shared Successfully!
				</h3>

				<p className="text-muted mb-4">
					Your post has been published and is now visible to your audience.
				</p>

				<Link
					href="/main/home"
					color="primary"
				>
					Done
				</Link>

			</CardBody>
		</Card>
	);
};

export default CPSuccessStep;