"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";

const AccountHistoryTab = () => {
  const [open, setOpen] = useState("");
  const [filterModal, setFilterModal] =
    useState(false);

  const [sortOrder, setSortOrder] =
    useState("newest");

  const [filters, setFilters] = useState({
    type: "all",
    from: "",
    to: "",
  });

  const toggle = (id) => {
    setOpen(open === id ? "" : id);
  };

  const historyItems = [
    {
      id: "1",
      title: "Website",
      type: "website",
      date: "2025-06-01",
      time: "17w",
      description:
        "You changed the website in your bio to https://www.Lorem.online",
      website: "https://www.Lorem.online",
    },
    {
      id: "2",
      title: "Bio",
      type: "bio",
      date: "2025-05-20",
      time: "20w",
      description:
        "You changed your bio to Lorem ipsum Storage Solutions",
      bio: "Lorem ipsum Storage Solutions",
    },
    {
      id: "3",
      title: "Email",
      type: "email",
      date: "2025-05-10",
      time: "20w",
      description:
        "You changed your email address",
      email: "Lorem000@gmail.com",
    },
    {
      id: "4",
      title: "Account Created",
      type: "created",
      date: "2025-01-16",
      time: "20w",
      description:
        "You created your profile on January 16, 2026",
    },
  ];

  const filteredHistory = useMemo(() => {
    let data = [...historyItems];

    // filter type
    if (filters.type !== "all") {
      data = data.filter(
        (item) => item.type === filters.type
      );
    }

    // date filter
    if (filters.from) {
      data = data.filter(
        (item) => item.date >= filters.from
      );
    }

    if (filters.to) {
      data = data.filter(
        (item) => item.date <= filters.to
      );
    }

    // sort
    data.sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) -
          new Date(a.date)
        : new Date(a.date) -
          new Date(b.date)
    );

    return data;
  }, [historyItems, filters, sortOrder]);

  const handleReset = () => {
    setSortOrder("newest");
    setFilters({
      type: "all",
      from: "",
      to: "",
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="text-center mb-3">
        <h6 className="fw-bold">
          About account history
        </h6>
        <small className="text-muted">
          Review changes you've made to your account since you created it.
        </small>
      </div>

      {/* ACTIONS */}
      <div className="d-flex gap-2 mb-3">
        <Button
          size="sm"
          color="light"
          className="border"
        >
          {sortOrder === "newest"
            ? "Newest to oldest"
            : "Oldest to newest"}
        </Button>

        <Button
          size="sm"
          color="light"
          className="border"
          onClick={() =>
            setFilterModal(true)
          }
        >
          Sort & Filter
        </Button>
      </div>

      {/* ACCORDION */}
      <Accordion open={open} toggle={toggle}>
        {filteredHistory.map((item) => (
          <AccordionItem key={item.id}>
            <AccordionHeader targetId={item.id}>
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-semibold">
                      {item.title}
                    </div>

                    <small className="text-muted">
                      {item.description}
                    </small>
                  </div>

                  <small className="text-muted">
                    {item.time}
                  </small>
                </div>
              </div>
            </AccordionHeader>

            <AccordionBody accordionId={item.id}>
              {item.type === "website" && (
                <Form>
                  <FormGroup>
                    <Label>
                      Website URL
                    </Label>
                    <Input
                      type="url"
                      defaultValue={
                        item.website
                      }
                    />
                  </FormGroup>

                  <Button color="primary">
                    Save
                  </Button>
                </Form>
              )}

              {item.type === "bio" && (
                <Form>
                  <FormGroup>
                    <Label>Bio</Label>
                    <Input
                      type="textarea"
                      rows={4}
                      defaultValue={
                        item.bio
                      }
                    />
                  </FormGroup>

                  <Button color="primary">
                    Save
                  </Button>
                </Form>
              )}

              {item.type === "email" && (
                <Form>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      defaultValue={
                        item.email
                      }
                    />
                  </FormGroup>

                  <Button color="primary">
                    Save
                  </Button>
                </Form>
              )}

              {item.type === "created" && (
                <div className="text-muted">
                  This record cannot be edited.
                </div>
              )}
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>

      {/* MODAL */}
      <Modal
        isOpen={filterModal}
        toggle={() =>
          setFilterModal(false)
        }
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
          {/* SORT */}
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

          {/* TYPE */}
          <FormGroup>
            <Label>Change Type</Label>
            <Input
              type="select"
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
            >
              <option value="all">
                All
              </option>
              <option value="website">
                Website
              </option>
              <option value="bio">
                Bio
              </option>
              <option value="email">
                Email
              </option>
              <option value="created">
                Account Created
              </option>
            </Input>
          </FormGroup>

          {/* DATE FROM */}
          <FormGroup>
            <Label>From Date</Label>
            <Input
              type="date"
              value={filters.from}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  from: e.target.value,
                }))
              }
            />
          </FormGroup>

          {/* DATE TO */}
          <FormGroup>
            <Label>To Date</Label>
            <Input
              type="date"
              value={filters.to}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  to: e.target.value,
                }))
              }
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            onClick={handleReset}
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
    </div>
  );
};

export default AccountHistoryTab;