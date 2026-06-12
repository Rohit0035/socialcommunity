"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Badge,
} from "reactstrap";
import { FiMessageCircle } from "react-icons/fi";

const StoryRepliesTab = () => {
    const [filterModal, setFilterModal] = useState(false);
    const [sortOrder, setSortOrder] = useState("newest");
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const [dateRange, setDateRange] = useState({
        from: "",
        to: "",
    });

    const [storyReplies, setStoryReplies] = useState([
        {
            id: 1,
            date: "2025-06-01",
            thumbnail: "https://picsum.photos/600?random=11",
            replyCount: 12,
            lastReply: "Amazing story 🔥",
        },
        {
            id: 2,
            date: "2025-05-25",
            thumbnail: "https://picsum.photos/600?random=12",
            replyCount: 5,
            lastReply: "Where is this place?",
        },
        {
            id: 3,
            date: "2025-05-10",
            thumbnail: "https://picsum.photos/600?random=13",
            replyCount: 18,
            lastReply: "Loved this ❤️",
        },
        {
            id: 4,
            date: "2025-04-20",
            thumbnail: "https://picsum.photos/600?random=14",
            replyCount: 3,
            lastReply: "Nice shot 👌",
        },
    ]);

    const toggleSelectionMode = () => {
        if (selectionMode) {
            setSelectedItems([]);
        }

        setSelectionMode(!selectionMode);
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleDelete = () => {
        setStoryReplies((prev) =>
            prev.filter(
                (item) => !selectedItems.includes(item.id)
            )
        );

        setSelectedItems([]);
        setSelectionMode(false);
    };

    const filteredStories = useMemo(() => {
        let data = [...storyReplies];

        if (dateRange.from) {
            data = data.filter(
                (item) => item.date >= dateRange.from
            );
        }

        if (dateRange.to) {
            data = data.filter(
                (item) => item.date <= dateRange.to
            );
        }

        data.sort((a, b) =>
            sortOrder === "newest"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );

        return data;
    }, [storyReplies, sortOrder, dateRange]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <h5 className="mb-0 fw-semibold small">
                    Story Replies
                </h5>

                <div className="d-flex gap-2 flex-wrap">
                    {selectionMode &&
                        selectedItems.length > 0 && (
                            <Button
                                color="danger"
                                size="sm"
                                className="rounded-pill px-4"
                                onClick={handleDelete}
                            >
                                Delete ({selectedItems.length})
                            </Button>
                        )}

                    <Button
                        color="light"
                        size="sm"
                        className="border rounded-pill px-4"
                        onClick={() => setFilterModal(true)}
                    >
                        Sort & Filter
                    </Button>

                    <Button
                        color={
                            selectionMode
                                ? "primary"
                                : "link"
                        }
                        size="sm"
                        className="text-decoration-none"
                        onClick={toggleSelectionMode}
                    >
                        {selectionMode
                            ? `Selected (${selectedItems.length})`
                            : "Select"}
                    </Button>
                </div>
            </div>

            <Row className="g-1">
                {filteredStories.map((story) => (
                    <Col
                        xs="6"
                        md="4"
                        lg="3"
                        key={story.id}
                    >
                        <div
                            className="position-relative overflow-hidden rounded"
                            style={{
                                aspectRatio: "1 / 1",
                            }}
                        >
                            {selectionMode && (
                                <div className="position-absolute top-0 start-0 p-2 z-3">
                                    <Input
                                        type="checkbox"
                                        checked={selectedItems.includes(
                                            story.id
                                        )}
                                        onChange={() =>
                                            handleSelectItem(
                                                story.id
                                            )
                                        }
                                    />
                                </div>
                            )}

                            <Image
                                src={story.thumbnail}
                                alt=""
                                fill
                                style={{
                                    objectFit: "cover",
                                }}
                            />

                            <div className="position-absolute top-0 end-0 p-2 z-3">
                                <Badge
                                    color="dark"
                                    pill
                                >
                                    <FiMessageCircle
                                        size={12}
                                        className="me-1"
                                    />
                                    {story.replyCount}
                                </Badge>
                            </div>

                            <div
                                className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                                style={{
                                    background:
                                        "linear-gradient(transparent, rgba(0,0,0,.8))",
                                }}
                            >
                                <small className="d-block text-truncate">
                                    {story.lastReply}
                                </small>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            <Modal
                isOpen={filterModal}
                toggle={() => setFilterModal(false)}
                centered
            >
                <ModalHeader
                    toggle={() =>
                        setFilterModal(false)
                    }
                >
                    Sort & Filter
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <Label>Sort Order</Label>

                        <Input
                            type="select"
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(
                                    e.target.value
                                )
                            }
                        >
                            <option value="newest">
                                Newest to Oldest
                            </option>

                            <option value="oldest">
                                Oldest to Newest
                            </option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>From Date</Label>

                        <Input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) =>
                                setDateRange({
                                    ...dateRange,
                                    from: e.target.value,
                                })
                            }
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>To Date</Label>

                        <Input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) =>
                                setDateRange({
                                    ...dateRange,
                                    to: e.target.value,
                                })
                            }
                        />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={() => {
                            setSortOrder("newest");
                            setDateRange({
                                from: "",
                                to: "",
                            });
                        }}
                    >
                        Reset
                    </Button>

                    <Button
                        color="primary"
                        onClick={() =>
                            setFilterModal(false)
                        }
                    >
                        Apply
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default StoryRepliesTab;