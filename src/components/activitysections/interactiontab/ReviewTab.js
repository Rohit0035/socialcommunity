
"use client";

import { useEffect, useMemo, useState } from "react";
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
} from "reactstrap";
import { FiStar } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewsTab = () => {
    const [filterModal, setFilterModal] = useState(false);
    const [sortOrder, setSortOrder] = useState("newest");
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const [dateRange, setDateRange] = useState({
        from: "",
        to: "",
    });

    const [reviews, setReviews] = useState([
        {
            id: 1,
            reviewer: "John Doe",
            rating: 5,
            review: "Amazing experience. Highly recommended!",
            date: "2025-06-01",
            thumbnail: "https://picsum.photos/600?random=21",
        },
        {
            id: 2,
            reviewer: "Sarah Wilson",
            rating: 4,
            review: "Very good service and support.",
            date: "2025-05-25",
            thumbnail: "https://picsum.photos/600?random=22",
        },
        {
            id: 3,
            reviewer: "Michael Brown",
            rating: 5,
            review: "Excellent quality and fast delivery.",
            date: "2025-05-10",
            thumbnail: "https://picsum.photos/600?random=23",
        },
        {
            id: 4,
            reviewer: "Emma Davis",
            rating: 3,
            review: "Good overall but could improve.",
            date: "2025-04-20",
            thumbnail: "https://picsum.photos/600?random=24",
        },
        {
            id: 5,
            reviewer: "James Smith",
            rating: 5,
            review: "Perfect! Will use again.",
            date: "2025-03-15",
            thumbnail: "https://picsum.photos/600?random=25",
        },
        {
            id: 6,
            reviewer: "Olivia Taylor",
            rating: 4,
            review: "Nice experience and friendly staff.",
            date: "2025-02-10",
            thumbnail: "https://picsum.photos/600?random=26",
        },
    ]);

    const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    "/api/your-activity/reviews"
                );
    
                setReviews(response.data.stats);
            } catch (error) {
                toast.error("Something went wrong");
                console.error(error);
            }
        };
    
        useEffect(() => {
            fetchReviews();
        }, []);

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

    const handleDeleteReviews = () => {
        setReviews((prev) =>
            prev.filter(
                (item) => !selectedItems.includes(item.id)
            )
        );

        setSelectedItems([]);
        setSelectionMode(false);
    };

    const filteredReviews = useMemo(() => {
        let data = [...reviews];

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
    }, [reviews, sortOrder, dateRange]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <h5 className="mb-0 fw-semibold small">
                    {sortOrder === "newest"
                        ? "Newest Reviews"
                        : "Oldest Reviews"}
                </h5>

                <div className="d-flex gap-2 flex-wrap">
                    {selectionMode &&
                        selectedItems.length > 0 && (
                            <Button
                                color="danger"
                                className="rounded-pill px-4 btn-sm"
                                onClick={handleDeleteReviews}
                            >
                                Delete ({selectedItems.length})
                            </Button>
                        )}

                    <Button
                        color="light"
                        className="border rounded-pill px-4 btn-sm"
                        onClick={() => setFilterModal(true)}
                    >
                        Sort & Filter
                    </Button>

                    <Button
                        color={
                            selectionMode ? "primary" : "link"
                        }
                        className="text-decoration-none btn-sm"
                        onClick={toggleSelectionMode}
                    >
                        {selectionMode
                            ? `Selected (${selectedItems.length})`
                            : "Select"}
                    </Button>
                </div>
            </div>

            <Row className="g-1">
                {filteredReviews.map((item) => (
                    <Col
                        xs="6"
                        md="4"
                        lg="3"
                        key={item.id}
                    >
                        <div
                            className="position-relative overflow-hidden"
                            style={{
                                aspectRatio: "1 / 1",
                            }}
                        >
                            {selectionMode && (
                                <div className="position-absolute top-0 start-0 p-2 z-3">
                                    <Input
                                        type="checkbox"
                                        checked={selectedItems.includes(
                                            item.id
                                        )}
                                        onChange={() =>
                                            handleSelectItem(
                                                item.id
                                            )
                                        }
                                    />
                                </div>
                            )}

                            <Image
                                src={item.thumbnail}
                                alt={item.reviewer}
                                fill
                                style={{
                                    objectFit: "cover",
                                }}
                            />

                            <div className="position-absolute top-0 end-0 p-2 text-white z-3">
                                <div
                                    className="d-flex align-items-center gap-1 px-2 py-1 rounded"
                                    style={{
                                        background:
                                            "rgba(0,0,0,0.55)",
                                        backdropFilter:
                                            "blur(4px)",
                                        fontSize: "12px",
                                    }}
                                >
                                    <FiStar
                                        size={14}
                                        fill="currentColor"
                                    />
                                    {item.rating}
                                </div>
                            </div>

                            <div
                                className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                                style={{
                                    background:
                                        "linear-gradient(transparent, rgba(0,0,0,.85))",
                                }}
                            >
                                <div className="fw-semibold small text-truncate">
                                    {item.reviewer}
                                </div>

                                <div
                                    className="small text-truncate"
                                    style={{
                                        opacity: 0.9,
                                    }}
                                >
                                    {item.review}
                                </div>
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
                    Sort & Filter Reviews
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

export default ReviewsTab;

