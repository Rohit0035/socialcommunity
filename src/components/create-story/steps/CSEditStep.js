"use client";

import {
	Row,
	Col,
	Button,
	Input,
} from "reactstrap";

import { useState } from "react";
import storyFilters from "../data/storyFilters";

const CSEditStep = ({
	storyMedia,
	selectedFilter,
	setSelectedFilter,
	prevStep,
	nextStep,
}) => {

	const [storyText, setStoryText] =
		useState("");

	return (
		<div className="cs-editor-wrapper">
			<div className="cs-editor-header">
				<Button
					color="link"
					onClick={prevStep}
					className="text-decoration-none"
				>
					Back
				</Button>

				<Button
					color="link"
					onClick={nextStep}
					className="text-decoration-none"
				>
					Next
				</Button>
			</div>

			<Row className="g-0">
				<Col lg="8">
					<div className="cs-phone-preview">
						{storyMedia.type.includes(
							"video"
						) ? (
							<video
								controls
								className="cs-story-media"
								style={{
									filter:
										selectedFilter,
								}}
							>
								<source
									src={
										storyMedia.preview
									}
								/>
							</video>
						) : (
							<img
								src={
									storyMedia.preview
								}
								alt=""
								className="cs-story-media"
								style={{
									filter:
										selectedFilter,
								}}
							/>
						)}

						{storyText && (
							<div className="cs-story-text">
								{storyText}
							</div>
						)}

					</div>
				</Col>

				<Col lg="4">
					<div className="cs-right-panel">
						<h6>
							Story Text
						</h6>

						<Input
							value={storyText}
							placeholder="Type Story Text..."
							onChange={(e) =>
								setStoryText(
									e.target.value
								)
							}
						/>

						<hr />

						<h6>
							Filters
						</h6>

						<div className="cs-filter-grid">
							{storyFilters.map(
								(
									item,
									index
								) => (
									<div
										key={index}
										className="cs-filter-card"
										onClick={() =>
											setSelectedFilter(
												item.filter
											)
										}
									>
										<img
											src={
												storyMedia.preview
											}
											alt=""
											style={{
												filter:
													item.filter,
											}}
										/>

										<span>
											{item.name}
										</span>
									</div>
								)
							)}
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default CSEditStep;