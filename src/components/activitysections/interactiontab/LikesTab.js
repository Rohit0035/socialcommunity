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
} from "reactstrap";
import { FiVideo, FiCopy } from "react-icons/fi";

const LikesTab = () => {
    const [filterModal, setFilterModal] = useState(false);
    const [sortOrder, setSortOrder] = useState("newest");
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const [dateRange, setDateRange] = useState({
        from: "",
        to: "",
    });

    const [mediaItems, setMediaItems] = useState([
        {
            id: 1,
            type: "image",
            date: "2025-06-01",
            src: "https://picsum.photos/600?random=1",
        },
        {
            id: 2,
            type: "video",
            date: "2025-05-25",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
            id: 3,
            type: "image",
            date: "2025-04-15",
            src: "https://picsum.photos/600?random=3",
        },
        {
            id: 4,
            type: "video",
            date: "2025-03-10",
            src: "https://www.w3schools.com/html/movie.mp4",
        },
        {
            id: 5,
            type: "image",
            date: "2025-02-20",
            src: "https://picsum.photos/600?random=5",
        },
        {
            id: 6,
            type: "image",
            date: "2025-01-18",
            src: "https://picsum.photos/600?random=6",
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
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const handleUnlike = () => {
        setMediaItems((prev) =>
            prev.filter(
                (item) => !selectedItems.includes(item.id)
            )
        );

        setSelectedItems([]);
        setSelectionMode(false);
    };

    const filteredMedia = useMemo(() => {
        let data = [...mediaItems];

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
    }, [mediaItems, sortOrder, dateRange]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <h5 className="mb-0 fw-semibold small">
                    {sortOrder === "newest"
                        ? "Newest to oldest"
                        : "Oldest to newest"}
                </h5>
                <div className="d-flex gap-2 flex-wrap">
                    {selectionMode &&
                        selectedItems.length > 0 && (
                            <Button
                                color="danger"
                                className="rounded-pill px-4 btn-sm"
                                onClick={handleUnlike}
                            >
                                Unlike ({selectedItems.length})
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
                        color={selectionMode ? "primary" : "link"}
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
                {filteredMedia.map((item) => (
                    <Col xs="6" md="4" lg="3" key={item.id}>
                        <div
                            className="position-relative overflow-hidden"
                            style={{ aspectRatio: "1 / 1" }}
                        >

                            {selectionMode && (
                                <div className="position-absolute top-0 start-0 p-2 z-3">
                                    <Input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() =>
                                            handleSelectItem(item.id)
                                        }
                                    />
                                </div>
                            )}

                            {item.type === "image" ? (
                                <Image
                                    src={item.src}
                                    alt=""
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                >
                                    <source
                                        src={item.src}
                                        type="video/mp4"
                                    />
                                </video>
                            )}

                            <div className="position-absolute top-0 end-0 p-2 text-white z-3">
                                {item.type === "video" ? (
                                    <FiVideo size={18} />
                                ) : (
                                    <FiCopy size={18} />
                                )}
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
                <ModalHeader toggle={() => setFilterModal(false)}>
                    Sort & Filter
                </ModalHeader>

                <ModalBody>

                    <FormGroup>
                        <Label>Sort Order</Label>
                        <Input
                            type="select"
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(e.target.value)
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
                            setDateRange({ from: "", to: "" });
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

export default LikesTab;